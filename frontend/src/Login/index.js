import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import MaskedInput from 'react-text-mask'
import './App.css';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            middleName: '',
            mailingAddr: '',
            email: '',
            creditNo:'',
            creditName: '',
            creditSecurity:'',
            creditExpiration: '',
            username: '',
            password: '',
            regStatusShow: false,
            regStatus: '',
            regResultClass: 'regResultSuccess',

        }
    }

    updateFName = (e) => {
        this.setState({
            firstName: e.target.value,
        });
    }

    updateLName = (e) => {
        this.setState({
            lastName: e.target.value,
        });
    }

    updateMName = (e) => {
        this.setState({
            middleName: e.target.value,
        });
    }

    updateMailingAddr = (e) => {
        this.setState({
            mailingAddr: e.target.value,
        });
    }

    updateEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    }

    updateCreditCardType = (e) => {
        this.setState({
            creditType: e.target.value,
        });
    }

    updateCreditCardNum = (e) => {
        this.setState({
            creditNo: e.target.value,
        });
    }

    updateCreditName = (e) => {
        this.setState({
            creditName: e.target.value,
        });
    }
    updateCreditSec = (e) => {
        this.setState({
            creditSecurity: e.target.value,
        });
    }
    updateCreditExp = (e) => {
        this.setState({
            creditExpiration: e.target.value,
        });
    }
    updateUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    }
    updatePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    }

    signUpUser = () => {
        const {
            firstName,
            lastName,
            middleName,
            mailingAddr,
            email,
            creditType,
            creditNo,
            creditName,
            creditSecurity,
            creditExpiration,
            username,
            password,
        } = this.state;

        var bodyFormData = new FormData();
        bodyFormData.set('cust_name', username);
        bodyFormData.set('credit_type', creditType);
        bodyFormData.set('credit_name', creditName);
        bodyFormData.set('credit_number', creditNo);
        bodyFormData.set('credit_expiration', creditExpiration);
        bodyFormData.set('credit_security', creditSecurity);
        bodyFormData.set('username', username);
        bodyFormData.set('password', password);
        bodyFormData.set('firstName', firstName);
        bodyFormData.set('lastName', lastName);
        bodyFormData.set('middleName', middleName);
        bodyFormData.set('mailingAddr', mailingAddr);
        bodyFormData.set('email', email);
        axios({
          method: 'post',
          url: 'http://localhost:8000/create-user-api',
          data: bodyFormData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
          .then((response) => {
              this.setState({
                regStatusShow: true,
                regResultClass: 'regResultSuccess',
                regStatus: 'Registration successfully completed.'
              })
          })
          .catch((error) => {
            console.log(error);
            this.setState({
              regStatusShow: true,
              regResultClass: 'regResultError',
              regStatus: 'Registration Failed.'
            })
          });
    }


    render() {
        return (
            <div>
                <div id="signup">
                    <input type="text"  placeholder="First Name" onChange={this.updateFName} />
                    <input type="text"  placeholder="Middle Name" onChange={this.updateMName}/>
                    <input type="text" placeholder="Last Name" onChange={this.updateLName}/>
                    <input type="text"  placeholder="Mailing Address" onChange={this.updateMailingAddr}/>
                    <input type="email"  placeholder="Email" onChange={this.updateEmail}/>
                    <select onChange={this.updateCreditType}>
                      <option value="" disabled selected>Credit Card Type</option>
                      <option value="visa">Visa</option>
                      <option value="mastercard">Master Card</option>
                      <option value="amex">American Express</option>
                    </select>
                    <MaskedInput
                      mask={[/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,' ',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,' ',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,' ',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,' ']}
                      className="form-control"
                      placeholder="Credit Card Number"
                      onChange={this.updateCreditCardNum}
                    />
                    <MaskedInput
                      mask={[/[0-9]/,/[0-9]/,/[0-9]/]}
                      className="form-control"
                      placeholder="Credit Card Security Code (3 digit code on back of card)"
                      onChange={this.updateCreditSec}
                    />
                    <MaskedInput
                      mask={[/[0-9]/,/[0-9]/,'/','2','0',/[0-9]/,/[0-9]/]}
                      className="form-control"
                      placeholder="Credit Card Expiration (mm/yyyy)"
                      onChange={this.updateCreditExp}
                    />
                    <input type="text"  placeholder="Pick a username" onChange={this.updateUsername}/>
                    <input type="password"  placeholder="Pick a password" onChange={this.updatePassword}/>
                    <button onClick={this.signUpUser}>Signup</button>
                    {this.state.regStatusShow &&<p className={this.state.regResultClass}>{this.state.regStatus}</p>}
                </div>
            </div>
        )
    };
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginError: false,
            loginErrorMsg: 'Login Failed'
        }
    }
    onLogin = () => {
        const { username, password } = this.state;
        var bodyFormData = new FormData();
        bodyFormData.set('username', username);
        bodyFormData.set('password', password);
        axios({
          method: 'post',
          url: 'http://localhost:8000/login-api',
          data: bodyFormData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
          .then((response) => {
            if( !(response.data === "no matching email & password in database")) {
              const parsedData = JSON.parse(response.data);
              this.setState({
                loginError: false,
                loginErrorMsg: ''
              })
               this.props.onLogin(parsedData[0].fields);
            } else {
                this.setState({
                    loginError: true,
                    loginErrorMsg: response.data
                  })
            }
          })
          .catch((error) => {
            console.log(error);
            this.setState({
              loginError: true,
              loginErrorMsg: 'Login Failed'
            })
          });
    }
    updateusername = (e) => {
        this.setState({
            username: e.target.value,
        });
    }

    updatePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    }
    _handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        this.onLogin();
      }
    }


    render() {
        return (
            <div>
                <div id="login">
                    <input type="text" id="email" placeholder="User Name" onChange={this.updateusername} onKeyPress={this._handleKeyPress} />
                    <input type="password" id="password" placeholder="Password" onChange={this.updatePassword} onKeyPress={this._handleKeyPress} />
                    <button id="send" onClick={this.onLogin}>Login</button>
                    {this.state.loginError && <p className="loginError">{this.state.loginErrorMsg} </p>}
                </div>
            </div>)
    }
};

class LoginForm extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            signup: false,
            login: true,
            loginHover: false,
            signupHover: false
        }
    }

    switch = (word) => {
        let signup;
        let login;
        if (word == "signup") { signup = true; login = false; }
        else { login = true; signup = false; }
        return this.setState({ login: login, signup: signup })
    };

    styleLogin = () => {
      if (this.state.loginHover) {
        if (this.state.login) {
          return { backgroundColor: "#FFDD00" }
        } else {
          return { backgroundColor: "#666" }
        }
      } else {
        if (this.state.login) {
          return { backgroundColor: "#FFDD00" }
        } else {
          return { backgroundColor: "#2c3e50" }
        }
      }
    }

    styleSignup = () => {
      if (this.state.signupHover) {
        if (this.state.signup) {
          return { backgroundColor: "#FFDD00" }
        } else {
          return { backgroundColor: "#666" }
        }
      } else {
        if (this.state.signup) {
          return { backgroundColor: "#FFDD00" }
        } else {
          return { backgroundColor: "#2c3e50" }
        }
      }
    }

    onMouseOver = (word) => {
      let signupHover;
      let loginHover;
      if (word == "signup") { signupHover = true; loginHover = false; }
      else { loginHover = true; signupHover = false; }
      return this.setState({ loginHover: loginHover, signupHover: signupHover });
    }

    onMouseOut = (word) => {
      return this.setState({ loginHover: false, signupHover: false });
    }

    render() {
        return (
            <div>
                <div id="buttons" className="loginButtons">
                    <p id="loginButton" onClick={this.switch.bind(null, "login")} className={this.state.login ? "yellow" : "blue"} onMouseOver={this.onMouseOver.bind(null, "login")} onMouseOut={this.onMouseOut.bind(null, "login")} style={this.styleLogin()}> Login</p>
                    <p id="signupButton" onClick={this.switch.bind(null, "signup")} className={this.state.signup ? "yellow" : "blue"} onMouseOver={this.onMouseOver.bind(null, "signup")} onMouseOut={this.onMouseOut.bind(null, "signup")} style={this.styleSignup()}>Sign up</p>
                </div>

                {this.state.signup ? <Signup /> : null}
                {this.state.login ? <Login onLogin={this.props.onLogin} /> : null}
            </div>
        )
    }
}

export default LoginForm;
