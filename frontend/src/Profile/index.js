import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Harika Gullapalli',
      email: 'harika@test.com',
      milleage: '4000 miles',
    }
  }

  render(){
    const {name , email, milleage, } = this.state;
        return (
          <div>
              <div className="profileHeaderRow">
                <p id="profileHeader" className="yellow"> User Profile</p> 
              </div>
            <div> 
              <div id="profile">
              <div className="eachValue">
                <label className="labelName">
                  Name:
                </label>
                <label className="labelValue">
                  {name}
                </label>
              </div>
              <div className="eachValue">
                <label className="labelName">
                  Email:
                </label>
                <label className="labelValue">
                  {email}
                </label>
              </div>
              <div className="eachValue">
                <label className="labelName">
                Milleage:
                </label>
                <label className="labelValue">
                  {milleage}
                </label>
              </div>
        </div>
            </div>
          </div>
        ) 
  }
}

export default Profile;
