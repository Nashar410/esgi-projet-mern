/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const fetch = require('node-fetch');
const cors = require("cors");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "3000";
const timeout = 10000;

app.use(cors());

/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */

app.get("/psp/:idTransaction", (req, res) => {

    const idTransaction = req.params.idTransaction;
    console.log(idTransaction);
    if (!!idTransaction) {
        res.status(202).send({message: "Processing"});
        handlePayment(idTransaction);
    } else {
        res.status(400).send({message: "Wrong parameter"});
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
            fetch('http://api:3000/api/transactions/psp/' + idTransaction, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({type: "PAYMENT_OK_PSP"})
            })
        },
        timeout);
};
