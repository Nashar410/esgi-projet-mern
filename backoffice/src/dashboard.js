import * as React from "react";
import { useGetIdentity, useGetOne } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Title} from 'react-admin';


export const Dashboard = () => {
    const {loading, loaded, identity} = useGetIdentity();
    // const {data : currentUser} = useGetOne('users', identity);
    console.log(identity);
    return (
        <Card>
            <Title title="Welcome to the administration"/>
            {identity=== 'true' ?
                <CardContent>Bienvenue ! Voici votre dashboard ! </CardContent>
                :
                <CardContent>Vous êtes en attente de confirmation</CardContent>
            }

        </Card>)

};

