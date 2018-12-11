import * as React from "react"
import "./footer.css"
import pin from "./src/pin.png"
import facebook from "./src/facebook.png"
import mail from "./src/mail.png"
import insta from "./src/insta.png"

class Footer extends React.Component {
  render() {
    return (
        <div>
        <footer>
          <div>
            <a href="https://www.instagram.com/fashionXproject/"><img className = "insta" src={insta} alt="insta icon"></img></a>
            <a href="https://www.pinterest.com/fashionxproject/"><img className = "pin" src={pin} alt="insta icon"></img></a>
            <a href="https://www.facebook.com/fashionXproject/"><img className = "facebook" src={facebook} alt="insta icon"></img></a>
            <a><img className = "mail" src={mail} alt="insta icon"></img></a>
            <pre> #BODYPOSITIVE</pre>
            <hr />
            <p className ="policy">Privacy Policy | Terms of Service | Cookie Policy</p>
            <p className ="policy"><i>Copyright  © “2018” FASHIONXPROJECT, INC. All rights reserved.</i></p>
          </div>
        </footer>
        </div>
    )
  }
}

export default Footer