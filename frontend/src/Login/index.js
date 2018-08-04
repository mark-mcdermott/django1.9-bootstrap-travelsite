import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

class Signup extends React.Component {
    render() {
        return (
            <div>
                <div id="signup">
                    <input type="text" id="first" placeholder="First Name" />
                    <input type="text" id="last" placeholder="Last Name" />
                    <input type="email" id="email" placeholder="Email" />
                    <input type="password" id="password" placeholder="Password" />
                    <input type="password" id="confirm" placeholder="Confirm Password" />
                    <button id="send">Signup</button>
                </div>
            </div>
        )
    };
};

class Login extends Component {
    onLogin = () => {
        this.props.onLogin();
    }
    render() {
        return (
            <div>
                <div id="login">
                    <input type="email" id="email" placeholder="Email" />
                    <input type="password" id="password" placeholder="Password" />
                    <button id="send" onClick={this.onLogin}>Login</button>
                </div>
            </div>)
    }
};

class LoginForm extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            signup: false,
            login: true
        }
    }

    switch = (word) => {
        let signup;
        let login;
        if (word == "signup") { signup = true; login = false; }
        else { login = true; signup = false; }
        return this.setState({ login: login, signup: signup })
    };

    render() {
        return (
            <div>
                <div id="buttons">
                    <p id="loginButton" onClick={this.switch.bind(null, "login")} className={this.state.login ? "yellow" : "blue"}> Login</p>
                    <p id="signupButton" onClick={this.switch.bind(null, "signup")} className={this.state.signup ? "yellow" : "blue"}>Sign up</p>

                </div>

                {this.state.signup ? <Signup /> : null}
                {this.state.login ? <Login onLogin={this.props.onLogin} /> : null}
            </div>
        )
    }
}

export default LoginForm;
