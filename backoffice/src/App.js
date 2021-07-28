import * as React from "react";
import {Admin, Resource, fetchUtils, useGetIdentity} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import {UserList, UserEdit} from './Users';
import {TransactionList, TransactionShow} from './Transactions';
import customRoutes from "./customRoutes";
import authProvider from "./authProvider";
import {Dashboard} from './Dashboard';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }
    const token = localStorage.getItem('token');
    options.headers.set('x-access-token', `${token}`);
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider("http://0.0.0.0:3000/api", httpClient, 'X-Total-Count');
const App = () => (

<Admin dashboard={Dashboard} customRoutes={customRoutes} authProvider={authProvider} dataProvider={dataProvider}>
    {permissions => [
        <Resource name="transactions" list={permissions === 'ROLE_ADMIN' ? TransactionList : null} show={permissions === 'ROLE_ADMIN' ? TransactionShow : null}/>,
        permissions === 'ROLE_ADMIN' 
            ? <Resource name="users" list={UserList} edit={UserEdit}/>
            : <p></p>
    ]}
        </Admin>
);

export default App;
