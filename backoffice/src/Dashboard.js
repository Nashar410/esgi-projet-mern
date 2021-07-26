import * as React from "react";
import {useGetIdentity} from 'react-admin';
import CardContent from '@material-ui/core/CardContent';
import {Title} from 'react-admin';
import Budget from "./dashboard/Budget";
import {Box, Grid} from "@material-ui/core";
import TotalProfit from "./dashboard/TotalProfit";
import TasksProgress from "./dashboard/TasksProgress";
import TotalCustomers from "./dashboard/TotalCustomers";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Button from "@material-ui/core/Button";

export const Dashboard = () => {
    const {identity} = useGetIdentity();
    return (
        <React.Fragment>
            <Title title="Amazon.fr"/>
            {identity === 'true' ?
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
                :
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
                            <AccessAlarmIcon style={{ fontSize: 50 }}/>
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
        </React.Fragment>
    )
}

