import React, { Component } from 'react';
import './App.css';
import Tabs from '../Tabs';

class App extends Component {
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
                <li className="active"><a href="/">Login</a></li>
                <li><a href="/">Account</a></li>
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
        <Tabs />
        <footer className="AppFooter">
          <p>
           Copyright © 2018 All rights reserved  </p>
        </footer>
      </div>
    );
  }
}

export default App;
