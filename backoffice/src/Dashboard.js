import * as React from 'react';
import {useState, useEffect} from 'react';
import {useDataProvider, Loading, Error, fetchUtils} from 'react-admin';
import {useGetIdentity} from 'react-admin';
import {Title} from 'react-admin';
import Budget from "./dashboard/Budget";
import {Box, Grid} from "@material-ui/core";
import TotalProfit from "./dashboard/TotalProfit";
import TasksProgress from "./dashboard/TasksProgress";
import TotalCustomers from "./dashboard/TotalCustomers";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from "@material-ui/core/Button";

export const Dashboard = ({permissions, ...props}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [users, setUsers] = useState();
    const {identity} = useGetIdentity();
    const headers = new Headers({Accept: 'application/json'});
    const token = localStorage.getItem('token');
    headers.set('x-access-token', `${token}`);

    useEffect(() => {
        fetch('http://0.0.0.0:3000/api/users/awaiting',
            {
                method: 'GET',
                headers: headers,
            })
            .then(({data}) => {
                console.log(data)
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);

    if (loading) return <Loading/>;
    if (error) return <Error error={error}/>;

    return (
        <React.Fragment>
            <Title title="Amazon.fr"/>
            {(identity === 'true' && permissions === 'ROLE_MERCHANT') &&
            <Container>
                <Button variant="contained" color="primary" href="#credentials">Access to your credentials</Button>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Box pt={3}>
                            <Budget/>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Box pt={3}>
                            <TotalProfit/>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Box pt={3}>
                            <TasksProgress/>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Box pt={3}>
                            <TotalCustomers/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            }
            {(identity === 'false' && permissions === 'ROLE_MERCHANT') &&
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="md">
                    <Box sx={{textAlign: 'center'}}>
                        <AccessAlarmIcon style={{fontSize: 50}}/>
                    </Box>

                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="h4"
                    >
                        Vous êtes en attente de confirmation
                    </Typography>
                </Container>
            </Box>
            }
            {permissions === 'ROLE_ADMIN' &&
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="md">
                    <Box sx={{textAlign: 'center'}}>
                        <LockOpenIcon style={{fontSize: 50}}/>
                    </Box>

                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="h4"
                    >
                        Bienvenue dans l'administration
                    </Typography>
                </Container>
            </Box>
            }
        </React.Fragment>
    )
}

