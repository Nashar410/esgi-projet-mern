module.exports = app => {
    const users = require("../controllers/credential.js");

    var router = require("express").Router();

    app.use('/credentials', router);
};
