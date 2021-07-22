import * as React from "react";
import {Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {UserList} from './users';
import customRoutes from "./customRoutes";
import authProvider from "./authProvider";

const dataProvider = jsonServerProvider("http://0.0.0.0:3000/api");
const App = () => (
    <Admin customRoutes={customRoutes} authProvider={authProvider} dataProvider={dataProvider}>
        <Resource name="users" list={UserList}/>
    </Admin>
);

export default App;
