import * as React from "react"
import "./HomePage.css"
import Logo from "../logo/Logo"
import Footer from "../footer/Footer"
import Filter from "../filter/Filter"
import Items from "../items/Items"
import MobileFilter from "../filter-mobile/mobile"
import home from "./src/home.png"
import profile from "./src/profile.png"
import logout from "./src/logout.png"

class HomePage extends React.Component {
  render() {
    return (
      <div className="main">
        <Logo />
        <div className = "icons">
          <img className = "home" src={home} alt="FashionXProject" />
          <img className = "profile" src={profile} alt="FashionXProject" />
          <img className = "logout" src={logout} onClick= { e => localStorage.removeItem("token")} alt="FashionXProject" />
        </div>
        <div className="filter-bar">
          <Filter />
        </div>
        <div className="filter">
          <MobileFilter />
        </div>

         <Items / >

        <Footer />
      </div>
    )
  }
}

export default HomePage