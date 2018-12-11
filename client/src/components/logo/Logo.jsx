import * as React from "react"
import logo from "../logo/src/logo.png"
import "./Logo.css"


class Logo extends React.Component {
  render() {
    return (
      <div className="main">
        <div className= "header">
          <img className = "logo" src={logo} alt="FashionXProject" />
        </div>
      </div>
    )
  }
}

export default Logo
