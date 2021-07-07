/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const {Scrapper} = require('./scrapper.js');

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

app.put("*", (req, res) => {
    // Appel du scrapper
    const url = 'http://api.exchangeratesapi.io/v1/latest?access_key=9da1f6d9f3e6d0c43c348c257699be8f';
    new Scrapper({url}, (data) => data.results, (data) => {
        // Stockage en BDD

        const toSave = {
            scrappingDate: data.date,
            rates: {...data.rates},
            sourceDevise: data.base
        };

        // Sauvegarde dans la BDD


    }).scrap();


});

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
