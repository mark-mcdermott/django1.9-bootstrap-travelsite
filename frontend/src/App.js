import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import { Provider } from "react-redux";
import { createStore } from "redux";
import travel from "./reducers";

import Travel from "./components/Travel";
import NotFound from "./components/NotFound";

let store = createStore(travel);

class App extends Component {
  render() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Travel} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
  }
}

export default App;
