import * as React from "react";
import {RouteWithoutLayout} from 'react-admin';
import { Route } from 'react-router-dom';
import Register from './Register';
import {CredentialsShow} from "./Credentials";

export default [
    <RouteWithoutLayout exact path="/register" component={Register}/>,
    <Route exact path="/credentials" component={CredentialsShow}/>,
];
