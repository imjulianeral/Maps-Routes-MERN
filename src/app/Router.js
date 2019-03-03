import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Maps from './Maps';
import Nav from './Nav';

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>            
            <Nav/>
            <Switch>
                <Route exact path="/" component={Maps} />
                <Route exact path="/camiones" component={Maps} />
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
