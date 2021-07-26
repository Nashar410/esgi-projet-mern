import * as React from "react";
import {useGetIdentity} from 'react-admin';
import CardContent from '@material-ui/core/CardContent';
import {Title} from 'react-admin';
import Budget from "./dashboard/Budget";
import {Grid} from "@material-ui/core";
import TotalProfit from "./dashboard/TotalProfit";
import TasksProgress from "./dashboard/TasksProgress";
import TotalCustomers from "./dashboard/TotalCustomers";
import Container from "@material-ui/core/Container";

export const Dashboard = () => {
    const {identity} = useGetIdentity();
    return (
        <React.Fragment>
            <Title title="Amazon.fr"/>
            {identity === 'true' ?
                <Container maxWidth={false}>
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
                            <Budget/>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <TotalProfit/>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <TasksProgress/>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <TotalCustomers/>
                        </Grid>
                    </Grid>
                </Container>
                :
                <CardContent>Vous êtes en attente de confirmation</CardContent>
            }
        </React.Fragment>
    )
}

