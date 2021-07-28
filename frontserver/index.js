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

/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */

app.get("/:idTransaction", (req, res) => {

    const idTransaction = req.params.idTransaction;
    console.log(`La transaction n°${idTransaction} a bien été enregistrée.`);
});

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
