import {useEffect, useState} from "react";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import * as React from "react";

export const TotalPendingTransactions = (props) => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [kpis, setkpis] = useState();
    const userId = localStorage.getItem('userId');
    // const secret = localStorage.getItem('secret');
    // const auth = "Basic " + btoa(${userId}:${secret});
    useEffect(() => {
        fetch('http://localhost:3000/api/transactions/kpis/total_pending/' + userId,
            {
                method: 'GET',
            })
            .then(({data}) => {
                console.log(data)
                setkpis(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);

    return (
        <Card {...props}>
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{justifyContent: 'space-between'}}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h6"
                        >
                            TOTAL PENDING TRANSACTIONS
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h3"
                        >
                            {kpis}
                        </Typography>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    );

}
