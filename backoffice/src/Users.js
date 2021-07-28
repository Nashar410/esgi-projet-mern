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
    DateInput,
    ReferenceInput,
    SelectInput,
    SearchInput
} from 'react-admin';

const listFilters = [
    <SearchInput source="q" alwaysOn />,
];

export const UserList = props => (
    <List filters={listFilters} {...props}>
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
            <TextInput source="kbis"/>
            <TextInput source="devise"/>
            <TextInput source="contact"/>
            <TextInput source="company"/>
            <BooleanInput source="confirmed"/>
        </SimpleForm>
    </Edit>
);
