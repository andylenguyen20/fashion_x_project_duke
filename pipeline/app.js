const {promisify} = require('util');
const fetch = require("node-fetch");
const assert = require('assert');
const fs = require('fs');
const nodemailer = require('nodemailer');
const MongoClient = require('mongodb').MongoClient;
const redis = require("redis");

// load credentials
const cred = JSON.parse(fs.readFileSync('./credentials/credentials.json', 'utf8'));

// Setup database
const dbUrl = `mongodb://${cred.db.user}:${cred.db.password}@${cred.db.host}`;
const dbClient = new MongoClient(dbUrl, { useNewUrlParser: true });
dbClient.connect(err => {
    assert.equal(null, err);
    console.log("Database connection successful.");
    const db = dbClient.db(cred.db.database);
    setInterval(fetchAndPush, 500*10, db);
});

// Setup cache
const cache = redis.createClient();
const getAsync = promisify(cache.get).bind(cache);
const lastFetchedTimeKey = cred.cache.key;
cache.on("connect", () => { console.log("Cache connection successful!."); });

// Setup Shopify
function uploadProduct(data) {
    const url = `https://${cred.shopify.key}:${cred.shopify.password}@shopherlook.myshopify.com/admin/products.json`;
    return fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data)
    });
}


function fetchAndPush(db) {
    getAsync(lastFetchedTimeKey)
        .then(t => fetchRecentPostsFromDB(db, parseInt(t) || 0))
        .then(res => {
	    const [posts, lastFetchedTime] = res;
            fetchUsersFromDB(db, posts).then(userData => {
              //map each user's email to user for easy post-user correlation in pushToGmail
              const users = userData.reduce(function(map, user) {
                  map[user.email] = user;
                  return map;
              }, {});
	      updateLastFetchedTime(posts, lastFetchedTime);
              pushToGmail(posts, users);
	      pushToShopify(posts, users);
            })
        });
}

function sendEmail(post, user, callback){
    var transporter = nodemailer.createTransport({
       service: 'smtp.gmail.com',
       port: 465,
       secure: true,
       auth: {
	 type: 'OAuth2',
	 user: cred.gmail.user,
	 clientId: cred.gmail.clientId,
	 clientSecret: cred.gmail.clientSecret,
         refreshToken: cred.gmail.refresh_token,
         accessToken: cred.gmail.access_token,
         expires: cred.gmail.expiry_date
	
       }
    });
    var mailOptions = {
        from: 'newlistingshopherlook@gmail.com',
	to: 'inchan.pub@gmail.com',
	//to: cred.gmail.to,
        subject: 'FashionXProject post',
        text: generatePostText(post) + generateInfluencerText(user),
        attachments: (post.img_urls.map((url, index) => {
                    return {
                        "filename": "img" + index + ".png",
                        "path": url
                    }
                }) || [])
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        callback('Email sent: ' + info.response);
    });
}

function generatePostText(post){
    return "Item: " + (post.brand || "") + " " + (post.item || "") + "\n"
                + "Price: $" + (post.selling_price || "") + "\n"
                + "Brand: " + (post.brand || "") + "\n"
                + "Size: " + (post.size || "") + "\n"
                + "Condition: " + (post.condition || "") + "\n"
                + "Type: " + (post.type || "") + "\n"
                + "Original Price: " + (post.original_price || "") + "\n"
                + "Description: " + (post.description || "") + "\n"
                + "---------------\n";
}

function generateInfluencerText(user){
    if(!user) return 'No influencer found';
    return "Influencer info:\n"
            + (user.instagram_handle || "") + "\n"
            + (user.height_ft || "") + "\' " + (user.height_in || "") + "\"" + "\n"
            + "Bust: " + (user.bust_band || "") + " " + (user.bust_cup || "") + "\n"
            + "Waist: " + (user.waist || "") + "\n"
            + "Usual T-shirt size: " + (user.shirt_size || "") + "\n"
            + "Usual Jean Size: " + (user.jean_size || "") + "\n"
            + "Torso Length: " + (user.torso_length || "") + "\n"
            + "Leg Length: " + (user.leg_length || "");
}

function pushToGmail(data, users) {
    data.forEach(post => {
        const user = users[post.email]
        sendEmail(post, user, function(res){
            console.log("Sending the following post to email:\n");
            console.log(post);
            console.log("Sent by the following user:\n")
            console.log(user);
            console.log("Result:\n");
            console.log(res)
        });
    });
}

function pushToShopify(posts, profiles) {
    posts.forEach(post => {
        const profile = profiles[post.email];
        const shopifyProduct = {
            product : {
                title: (post.brand || "") + " " + (post.item || "") + " " + (post.size || ""),
                body_html: `
                    <h3>Seller</h3>
                    <p>${profile.instagram_handle || ""}</p>
                    <h3>Product Type</h3>
                    <p>${post.type || ""}</p>
                    <h3>Condition</h3>
                    <p>${post.condition || ""}</p>
                    <h3>Product Description</h3>
                    <p>${post.description || ""}</p>
                `,
		available: true,
                variants: [
                    {
                        "price": post.selling_price || 1000,
			"inventory_management": "shopify",
                        "inventory_quantity": 1,
                    }
                ],
                images: (post.img_urls.map(url => {
                    return {
                      "src": url
                    }
                }) || [])
            }
        };
	uploadProduct(shopifyProduct).then(console.log).catch(console.log);
    });
}

function fetchUsersFromDB(db, data) {
    return db
        .collection(cred.db.userCollection)
        .find({email : {"$in" : data.map(post => post.email)}})
        .toArray()
}

function fetchRecentPostsFromDB(db, lastFetchedTime) {
    const res = db
        .collection(cred.db.productCollection)
        .find({ date : { $gt : new Date(lastFetchedTime) }})
        .toArray()
    return Promise.all([res, lastFetchedTime]);
}

function updateLastFetchedTime(data, lastFetchedTime) {
    cache.set(
        lastFetchedTimeKey, 
        Math.max(
            lastFetchedTime, 
            ...data.map(obj => new Date(obj.date).getTime())
        ), 
        redis.print
    );
}
