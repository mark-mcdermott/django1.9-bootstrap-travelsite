import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import './App.css';
import Tabs from '../Tabs';
import Login from '../Login';
import Account from '../Account';

class App extends Component {
  render() {
    return (
      <Tabs /> 
    );
  }
}

export default App;
