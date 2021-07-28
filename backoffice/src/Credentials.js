import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import {Title} from "react-admin";
import { useGetOne } from 'react-admin';


export const CredentialsShow = () => {
    const idUser = localStorage.getItem('userId');
        return (
            <Card>
                <Title title="Mes credentials" />
                <CardContent>
                </CardContent>
            </Card>
        )
};
