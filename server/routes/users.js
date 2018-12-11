const express = require('express');
const router = express.Router();
const User = require('../models/User').User;

// get all users
router.get('/', (req, res, next) => {
    User.find({}).exec((err, users) => {
        if (err) return next(err);
        res.json(users);
    });
});

// create a new user and login to that user
router.post('/', (req, res, next) =>{
	/*
	*	Req should be of the form:
	*	{
	*		email: email,
	*		password: password,
	*		access: [2],
	*		other optional profile fields
	*	}
	*/
    User.find({email: req.body.email}).exec((err, users) => {
        if (err || users.length > 0) {
            err = new Error('User already exists');
            err.status = 400;
            return next(err);
        }else{
            // save user to database
            user = new User(req.body);
            user.save(function(err, user) {
                if (err){
                    next(err)
                }else{
                    res.json(user);
                }
            });
            
        }
    });
});


// login to your account
router.post('/login', (req, res, next) => {
	/*
	*	Req should be of the form:
	*	{
	*		email: email,
	*		password: password
	*	}
	*/
	User.getAuthenticated(req.body.email, req.body.password, function(err, user, reason) {
        if (err) next(err);
        
        // login was successful if we have a user
        if (user) {
            res.json(user);
            console.log('Successful login.');
            return;
        }else{
            // otherwise we can determine why we failed
            var reasons = User.failedLogin;
            switch (reason) {
                case reasons.NOT_FOUND:
                    console.log("User not found!");
                case reasons.PASSWORD_INCORRECT:
                    // note: these cases are usually treated the same - don't tell
                    // the user *why* the login failed, only that it did
                    console.log("Password incorrect!");
                    break;
            }
            err = new Error("Login failed");
            err.status = 400;
            next(err);
        }
    });
});

// edit a user's profile
router.put('/:user_id', (req, res, next) => {
	/*
	*	Req should be of the form:
	*	{
    *       name: { type: String},
	*		category: { type: String},
    *		height: { type: String},
    *		weight: { type: String},
    *		bust: { type: String},
    *		age: { type: String},
    *		waist: { type: String},
    *		hips: { type: String},
    *		legLength: { type: String}
	*	}
	*/
	User.findById(req.params.user_id, function(err, user) {
        if (err) next(err);

        // edit the fields of the user
        possibleCategories = ["name", "category", "height", "weight", "bust", "age", "waist", "hips", "legLength"];
        for(category in possibleCategories){
        	if(req.body[category]){
        		user[category] = req.body[category];
        	}
        }

        // save the user
        user.save(function(err) {
           	if (err) next(err);
            res.json({ message: 'User profile updated!' });
        });
    });
});

module.exports = router;