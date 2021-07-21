import * as React from "react";
import {RouteWithoutLayout} from 'react-admin';
import Register from './Register';

export default [
    <RouteWithoutLayout exact path="/register" component={Register}/>,
];
