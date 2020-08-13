import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard/';
import Events from './pages/Events/';
import Login from './pages/Login/';
import RegisterUser from './pages/RegisterUser/';


export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Login } />
                <Route path="/dashboard" component={ Dashboard } />
                <Route path="/events" component={ Events } />
                <Route path="/user/register" component={ RegisterUser } />
            </Switch>
        </BrowserRouter>
    );
}