import * as React from "react";
import {Admin, Resource, EditGuesser, initialState} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {UserList, UserEdit} from './users';
import customRoutes from "./customRoutes";
import authProvider from "./authProvider";
import {Dashboard} from './dashboard';


const dataProvider = jsonServerProvider("http://0.0.0.0:3000/api");
const App = () => (

<Admin dashboard={Dashboard} customRoutes={customRoutes} authProvider={authProvider} dataProvider={dataProvider}>
    {permissions => [
        permissions === 'ROLE_USER,ROLE_MERCHANT'
            ? <Resource name="users" list={UserList} edit={UserEdit}/>
            : <p>You don't have access</p>
    ]}
</Admin>
);

export default App;
