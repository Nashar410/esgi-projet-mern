import * as React from 'react';
import {useState, useEffect} from 'react';
import {useDataProvider, Loading, Error} from 'react-admin';
import {Title} from 'react-admin';
import {Box, Grid} from "@material-ui/core";
import TasksProgress from "./dashboard/TasksProgress";
import TotalCustomers from "./dashboard/TotalCustomers";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import Profile from "./Profile";
import {TotalTransactions} from "./dashboard/TotalTransactions";
import {TotalPendingTransactions} from "./dashboard/TotalPendingTransactions";

export const Dashboard = () => {
    const dataProvider = useDataProvider();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [user, setUser] = useState();
    const userId = localStorage.getItem('userId');
    const userConfirmed = localStorage.getItem('confirmed');
    const permissions = localStorage.getItem('permissions');

    useEffect(() => {
        if (userConfirmed === 'true' && permissions === 'ROLE_MERCHANT') {
            setLoading(true);
            dataProvider.getOne('users', {id: userId})
                .then(({data}) => {
                    setUser(data);
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
        <React.Fragment>
            <Title title="Amazon.fr"/>
            {(userConfirmed === 'true' && permissions === 'ROLE_MERCHANT') &&
            <Container>
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="h4"
                >
                    Bonjour {user && user.firstName} {user && user.lastName},
                </Typography>
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
                            <TotalTransactions/>
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
                            <TotalPendingTransactions/>
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
                    {
                        user &&
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper>
                                <Profile user={user}/>
                            </Paper>
                        </Grid>
                    }
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Button variant="contained" color="primary" href="#credentials">Access to your
                            credentials</Button>
                    </Grid>
                </Grid>
            </Container>
            }
            {(userConfirmed === 'false' && permissions === 'ROLE_MERCHANT') &&
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
                        Vous ??tes en attente de confirmation
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

