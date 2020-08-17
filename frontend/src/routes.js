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
                <Route path="/" exact component={ Dashboard } />
                <Route path="/login" component={ Login } />
                <Route path="/events" component={ Events } />
                <Route path="/user/register" component={ RegisterUser } />
            </Switch>
        </BrowserRouter>
    );
}