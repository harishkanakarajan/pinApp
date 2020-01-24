import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

/* Importing neccesary components for Routing */
import Home from './Components/Home'
/* import ListPin from './Components/ListPinComponents/ListPin' */
import NotFound from './Components/CommonComponents/404'

export default class Routing extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* Available routes for the application */}
          <Route exact path="/" component={Home} />
          {/* <Route path="/list" component={ListPin} /> */}

          {/* Default Routing 404 handler if invalid URLs are given */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}
