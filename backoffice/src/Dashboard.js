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
                <CardContent>Vous êtes en attente de confirmation</CardContent>
            }
        </React.Fragment>
    )
}

