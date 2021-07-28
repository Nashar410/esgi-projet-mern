import React, {useEffect, useState} from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import {Error, Loading, Title, useDataProvider} from "react-admin";


export const CredentialsShow = () => {
    const dataProvider = useDataProvider();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [credential, setCredential] = useState();
    const userId = localStorage.getItem('userId');
    const userConfirmed = localStorage.getItem('confirmed');
    const permissions = localStorage.getItem('permissions');

    useEffect(() => {
        if (userConfirmed === 'true' && permissions === 'ROLE_MERCHANT') {
            setLoading(true);
            dataProvider.getMany('credentials', {id: [userId]})
                .then(({data}) => {
                    console.log("credential ====>")
                    console.log(data)
                    setCredential(data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                })
        }

    }, []);

    if (loading) return <Loading/>;
    if (error) return <Error error={error}/>;

    return (
        <Card>
            <Title title="Mes credentials"/>
            <CardContent>
                <p>Mes credentials</p>
            </CardContent>
        </Card>
    )
};
