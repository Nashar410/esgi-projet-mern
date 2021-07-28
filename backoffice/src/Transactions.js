import * as React from "react";
import {
    List,
    Show,
    Datagrid,
    TextField,
    SimpleShowLayout
} from 'react-admin';


export const TransactionList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id"/>
            <TextField source="userId"/>
            <TextField source="type"/>
            <TextField source="total"/>
            <TextField source="cart"/>
            <TextField source="currency"/>
        </Datagrid>
    </List>
);

export const TransactionShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="userId"/>
            <TextField source="type"/>
            <TextField source="total"/>
            <TextField source="cart"/>
            <TextField source="currency"/>
            <TextField source="consumerLastname"/>
            <TextField source="consumerFirstname"/>
            <TextField source="billingAddress"/>
            <TextField source="billingZipCode"/>
            <TextField source="billingCity"/>
            <TextField source="billingCountry"/>
            <TextField source="shippingAddress"/>
            <TextField source="shippingZipCode"/>
            <TextField source="shippingCity"/>
            <TextField source="shippingCountry"/>
        </SimpleShowLayout>
    </Show>
);
