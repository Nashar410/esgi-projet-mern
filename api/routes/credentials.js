module.exports = app => {
    const credentials = require("../controllers/credential.js");
    const {authJwt} = require("../middleware");

    var router = require("express").Router();

    router.get("/:id", [authJwt.verifyToken, authJwt.isMerchantOrAdmin], credentials.findByUser);

    app.use('/api/credentials', router);
};
