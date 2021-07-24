import * as React from "react";
import {Admin, Resource, EditGuesser, initialState} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {UserList, UserEdit} from './users';
import customRoutes from "./customRoutes";
import authProvider from "./authProvider";


const dataProvider = jsonServerProvider("http://0.0.0.0:3000/api");
const App = () => (
    <Admin customRoutes={customRoutes} authProvider={authProvider} dataProvider={dataProvider}>
        <Resource name="users" list={UserList} edit={UserEdit}/>
    </Admin>
);

export default App;
