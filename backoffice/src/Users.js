import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    TextInput,
    BooleanInput,
    BooleanField,
    Edit,
    SimpleForm,
    DateInput
} from 'react-admin';


export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="firstName"/>
            <TextField source="lastName"/>
            <TextField source="username"/>
            <EmailField source="email"/>
            <BooleanField source="confirmed"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="firstName"/>
            <TextInput source="lastName"/>
            <TextInput source="email"/>
            <TextInput source="username"/>
            <DateInput source="kbis"/>
            <TextInput source="role"/>
            <TextInput source="devise"/>
            <TextInput source="contact"/>
            <TextInput source="company"/>
            <BooleanInput source="confirmed"/>
        </SimpleForm>
    </Edit>
);
