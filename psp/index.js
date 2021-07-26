/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "3000";
const timeout = 1000;

/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */

app.get("*", (req, res) => {

    const infoCB = req.query.infoCB;
    const price = req.query.price;
    const devise = req.query.devise;
    const idTransaction = req.query.idTransaction;

    if(!!infoCB && !!price && !!devise && !!idTransaction){
        handlePayment(idTransaction);
        res.status(202).send("Processing");
    } else {
        res.status(400).send("Wrong number of get params");
    }
});

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});


const handlePayment = (idTransaction) => {
    setTimeout(() => {
        // Requêter le backoffice pour lui dire ok
        },
        timeout);
};
