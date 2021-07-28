import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Card, CardContent, Grid} from "@material-ui/core";

export default function Profile({props, user}) {
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
                            Vos informations
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="p"
                        >
                            Email : {user.email}
                        </Typography>
                        <br/>
                        <Typography
                            color="textPrimary"
                            variant="p"
                        >
                            Username : {user.username}
                        </Typography>
                        <br/>
                        <Typography
                            color="textPrimary"
                            variant="p"
                        >
                            KBIS : {user.kbis}
                        </Typography>
                        <br/>
                        <Typography
                            color="textPrimary"
                            variant="p"
                        >
                            Company : {user.company}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
