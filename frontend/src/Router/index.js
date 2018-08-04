import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from '../Login';
import Profile from '../Profile';
import App from '../App';
import './App.css';

class  AppRoute extends React.Component {
    render() {
        return (
            <div className="App">
            <div className="homeBg">
            <div className="headerRow">
                <div className="headerLogo">
                    <a href="/">Travel Portal</a>
                </div>
                <div className="HeaderMenu">
                        <ul>
                            <li className="active"><a href="/">Home</a></li>
                            <li ><a href="/Login">Login</a></li>
                            <li><a href="/Profile">Profile</a></li>
                        </ul>
                </div>
                </div>
            <div className="innerBgOverlay">
            </div>
            <div className="headingText">
            <h2>Explore our most tavel agency</h2>
            <h1>Our Travel Agency</h1>
            </div>
        </div>
        <Router>
            <div>
            <Route className="active" exact path="/" component={App}  />
            <Route path="/Login" component={Login} />
            <Route path="/Profile" component={Profile} />
            </div>
        </Router> 
            <footer className="AppFooter">
                <p>
                Copyright © 2018 All rights reserved  </p>
            </footer>
        </div> 
    );
    }
}

export default AppRoute;