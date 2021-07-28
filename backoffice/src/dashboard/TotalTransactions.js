// import {useEffect, useState} from "react";
// import {Avatar, Box, Card, CardContent, Grid, Typography} from "@material-ui/core";
// import {green} from "@material-ui/core/colors";
// import PeopleIcon from "@material-ui/icons/PeopleOutlined";
// import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
// import * as React from "react";
//
// export const TotalTransactions = () => {
//     const [kpis, setkpis] = useState();
//     const userId = localStorage.getItem('userId');
//
//     useEffect(() => {
//         fetch('http://0.0.0.0:3000/api/transactions/kpis/total_pending/' + userId,
//             {
//                 method: 'GET',
//                 headers: headers,
//             })
//             .then(({data}) => {
//                 console.log(data)
//                 setkpis(data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 setError(error);
//                 setLoading(false);
//             })
//     }, []);
//
//     return (
//         <Card {...props}>
//             <CardContent>
//                 <Grid
//                     container
//                     spacing={3}
//                     sx={{justifyContent: 'space-between'}}
//                 >
//                     <Grid item>
//                         <Typography
//                             color="textSecondary"
//                             gutterBottom
//                             variant="h6"
//                         >
//                             TOTAL CUSTOMERS
//                         </Typography>
//                         <Typography
//                             color="textPrimary"
//                             variant="h3"
//                         >
//                             {kpis}
//                         </Typography>
//                     </Grid>
//                 </Grid>
//
//             </CardContent>
//         </Card>
//     );
//
// }
