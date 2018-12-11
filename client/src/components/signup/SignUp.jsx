import * as React from "react"
import Logo from '../logo/Logo'
import "./SignUp.css"
import Footer from "../footer/Footer"

class SignUp extends React.Component {

  state = {
    email: null,
    password: null,
    name: null,
    Age: null,
    Height: null,
    Weight: null,
    Bust: null,
    Jean_Size: null,
    Shirt_Size: null,
    leg_length: null,
    errDisplayed: false,
    errMsg:"asfasd"
  }

  displayError(msg){
    this.setState({errDisplayed: true});
    this.setState({errMsg: msg});
  }

  signUp(){
    var reqBody = {};
    var possibleCategories = ["email", "password", "name", "Age", "Height", "Weight", "Bust", "Jean_Size", "Shirt_Size", "leg_length"];
    var context = this;
    if(!this.state.email || !this.state.password || !this.state.name){
      this.displayError("Please include name, email, and password");
      return;
    }
    possibleCategories.forEach(function(category){
      if(context.state[category]){
        reqBody[category] = context.state[category]
      }
    });
    console.log(JSON.stringify(reqBody))
    var baseUrl = "http://localhost:3000";
    fetch(baseUrl + '/users/', {
        method: 'post',
        body: JSON.stringify(reqBody),
        headers: {'Content-Type':'application/json'}
      }).then(function(response) {
          console.log(response);
          if(!response.ok){
            context.displayError("Error creating account!");
            return null;
          }else{
            return response.json()
          }
      }).then(function(data){
        if(data){
          //put user id into local storage and redirect to home page
          console.log(data);
          localStorage.setItem("token", data._id)
          context.props.history.push('/')
        }
      });
  }

  render() {
    const style = this.state.errDisplayed ? {'textAlign': 'center', 'color' : 'palevioletred'} : {'display':'none', 'textAlign': 'center', 'color' : 'palevioletred'};
    return (
      <div>
        <Logo />
          <div>
            <input
              className = "signup"
              id="name"
              placeholder="First Name"
              type="text"
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>
          <div>
            <input
              className = "signup"
              id="email"
              placeholder="email"
              type="text"
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
          <input
              id="password"
              className = "signup"
              placeholder="password"
              type="password"
              onChange={e => this.setState({ password: e.target.value })
              }
            />
          </div>
          <div>
            <input
              id="age"
              className = "signup"
              placeholder="Age"
              type="text"
              onChange={e => this.setState({ Age: e.target.value })
              }
            />
          </div>
          <div>
            <input
              id="Height"
              className = "signup"
              placeholder="Height"
              type="text"
              onChange={e => this.setState({ Height: e.target.value })
              }
            />
          </div>
          <div>
            <input
              id="Weight"
              className = "signup"
              placeholder="Weight"
              type="text"
              onChange={e => this.setState({ Weight: e.target.value })
              }
            />
          </div>
          <div>
            <input
              id="Bust"
              className = "signup"
              placeholder="Bust"
              type="text"
              onChange={e => this.setState({ Bust: e.target.value })
              }
            />
          </div>
          <div>
            <input
              id="Jean_Size"
              className = "signup"
              placeholder="Usual Jean Size"
              type="text"
              onChange={e => this.setState({ Jean_Size: e.target.value })
              }
            />
          </div>
          <div>
            <input
              id="Shirt_Size"
              className = "signup"
              placeholder="Usual Shirt Size"
              type="text"
              onChange={e => this.setState({ Shirt_Size: e.target.value })
              }
            />
          </div>
          <div>
            <input
              id="leg_length"
              className = "signup"
              placeholder="Leg Length"
              type="text"
              onChange={e => this.setState({ leg_length: e.target.value })
              }
            />
          </div>
          <p className = "policy">** Other users will not be able to see your information.</p>
          <p className = "policy"> ** To enhance your user experience, provide the most information you are comfortable with.</p>
          <div style={style}> {this.state.errMsg}
          </div>
          <button type="submit" className="SubmitAccountButton" onClick={this.signUp.bind(this)}>
            SIGN UP
          </button>
          <Footer />
    </div>
    )
  }
}

export default SignUp