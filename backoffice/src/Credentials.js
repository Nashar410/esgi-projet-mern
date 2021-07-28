import React, {useEffect, useState} from 'react';
import {Error, Loading, Title, useDataProvider} from "react-admin";


const columns = [
    {field: 'id', headerName: 'ID', width: 90},
    {
        field: 'clientSecret',
        headerName: 'Client Secret',
        width: 150,
        editable: true,
    },
    {
        field: 'clientToker',
        headerName: 'Client Token',
        width: 150,
        editable: true,
    },
];

export const CredentialsShow = () => {
    const dataProvider = useDataProvider();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [credential, setCredential] = useState();
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('token')
    const userConfirmed = localStorage.getItem('confirmed');
    const permissions = localStorage.getItem('permissions');
    let component;

    useEffect(() => {
        if (userConfirmed === 'true' && permissions === 'ROLE_MERCHANT') {
            setLoading(true);
            console.log(userToken);
            console.log(userId);

            fetch('http://localhost:3000/api/credentials/' + userId, {
                method: 'GET',
                headers: {
                    // 'Accept': 'application/json',
                    'x-access-token': userToken,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setLoading(false);
                    setCredential(data)
                    console.log('======> credentials')
                    console.log(data)
                })
        }

    }, []);

    if (loading) return <Loading/>;
    if (error) return <Error error={error}/>;

    return (
        <div>
            <h1>Voici vos credentials</h1>
            <p>Token : {credential && credential.clientToken}</p>
            <p>Secret : {credential && credential.clientSecret}</p>
        </div>
    )
};
