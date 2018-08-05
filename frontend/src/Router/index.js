import React from "react";
import { MemoryRouter as Router, Route, Redirect, Link } from "react-router-dom";
import Login from '../Login';
import Profile from '../Profile';
import App from '../App';
import './App.css';


class AppRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userDetails: {}
        };
    }
    onLogin = (userDetails) => {
        console.log("User details .", userDetails);
        this.setState({
            isLoggedIn: true,
            userDetails,
        });

    }
    onLogOut = (e) => {
        e.preventDefault();
        this.setState({
            isLoggedIn: false
        });
    }
    render() {
        console.log("New state is...", this.state.isLoggedIn);
        return (
            <Router>
                <div className="App">
                    <div className="homeBg">
                        <div className="headerRow">
                            <div className="headerLogo">
                                <a href="/">Travel Portal</a>
                            </div>
                            <div className="HeaderMenu">
                                <ul>
                                    <li className="active">
                                        <Link to="/">Home</Link>
                                    </li>
                                    {this.state.isLoggedIn && (<li ><a className="logout" onClick={(e) => this.onLogOut(e)}>Logout</a></li>)}
                                    {!this.state.isLoggedIn && (<li ><Link to="/Login">Login</Link></li>)}
                                    <li><Link to="/Profile">Profile</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="innerBgOverlay">
                        </div>
                        <div className="headingText">
                            <h2>Explore our tavel agency</h2>
                            <h1>Our Travel Agency</h1>
                        </div>
                    </div>
                    <div>
                        <Route
                            className="active"
                            exact path="/"
                            render={() =>
                                this.state.isLoggedIn ? (
                                    <App />
                                ) : (<Login onLogin={this.onLogin} />)
                            }
                        />
                        <Route
                            path="/Login"
                            render={() => <Login onLogin={this.onLogin} />}
                        />

                        <Route
                            path="/Profile"
                            render={() =>
                                this.state.isLoggedIn ? (
                                    <Profile userDetails={this.state.userDetails} />
                                ) : (<Login onLogin={this.onLogin} />)
                            }
                        />
                    </div>
                    <footer className="AppFooter">
                        <p>
                            Copyright © 2018 All rights reserved  </p>
                    </footer>
                </div>
            </Router>
        );
    }
}

export default AppRoute;
