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
    const {userDetails} = this.props;
  
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
                  {userDetails.name_first}  {userDetails.name_middle} {userDetails.name_last}
                </label>
              </div>
              <div className="eachValue">
                <label className="labelName">
                  Email:
                </label>
                <label className="labelValue">
                  {userDetails.email}
                </label>
              </div>
              <div className="eachValue">
                <label className="labelName">
                Address:
                </label>
                <label className="labelValue">
                  {userDetails.address_street},
                  {userDetails.address_city},
                  {userDetails.address_state} - {userDetails.address_zip}
                </label>
              </div>
        </div>
            </div>
          </div>
        ) 
  }
}

export default Profile;
