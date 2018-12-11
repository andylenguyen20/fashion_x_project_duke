import * as React from "react"
import Logo from '../logo/Logo'
import "./Login.css"
import Footer from "../footer/Footer"

class LogIn extends React.Component {
  state = {
    email: "",
    password: "",
    errDisplayed: false,
    ischecked : false
  }

  login(){
     var baseUrl = "http://localhost:3000";
     var context = this;
     fetch(baseUrl + '/users/login/', {
          method: 'post',
          body: JSON.stringify({email: context.state.email, password: context.state.password}),
          headers: {'Content-Type':'application/json'}
        }).then(function(response) {
          console.log(response);
          if(!response.ok){
            context.setState({errDisplayed: true});
            return null;
          }else{
            return response.json()
          }
        }).then(function(data){
            if(data){
              console.log(data);
              //put user id into local storage and redirect to home page
              if(!context.state.ischecked){
                sessionStorage.setItem("token", data._id);
              }else{
                localStorage.setItem("token", data._id)
              }
              context.props.history.push('/')
            }
     });
  }

  render() {
    const style = this.state.errDisplayed ? {'textAlign': 'center', 'color' : 'palevioletred'} : {'display':'none', 'textAlign': 'center', 'color' : 'palevioletred'};
    return (
      <div className = "login_main">
        <Logo />
          <div>
            <input
              id="email"
              className = "login"
              placeholder="email"
              type="text"
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
          <input
              id="password"
              className = "login"
              placeholder="password"
              type="password"
              onChange={e => this.setState({ password: e.target.value })
              }
            />
          </div>
          <div style={style}> Incorrect username or password
          </div>
          <label>
            <input
              name="isGoing"
              type="checkbox"
              // checked= 
              onChange= {e => this.setState({ ischecked: true })}
              />
              Keep Me logged in
            </label>
          <button type="submit" className="LogInButton" onClick = {this.login.bind(this)}>
            LOG IN
          </button>
          
      
          <Footer />
      </div>
    )
  }
}

export default LogIn