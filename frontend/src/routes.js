import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import DashboardComponent from './components/DashboardComponent';
import LoginComponent from './components/LoginComponent';
import RegisterUserComponent from './components/RegisterUserComponent';


export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ LoginComponent } />
                <Route path="/dashboard" component={ DashboardComponent } />
                <Route path="/user/register" component={ RegisterUserComponent } />
            </Switch>
        </BrowserRouter>
    );
}