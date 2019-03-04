import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Maps from './Maps';
import Nav from './Nav';
import Login from './Login';
import Users from './Users';

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>            
            <Nav/>
            <Switch>
                <Route exact path="/" component={Maps} />
                <Route exact path="/camiones" component={Maps} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/usuarios" component={Users} />
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
