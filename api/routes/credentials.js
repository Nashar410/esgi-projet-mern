module.exports = app => {
    const credentials = require("../controllers/credential.js");
    const {authJwt} = require("../middleware");

    var router = require("express").Router();

    // Create a new Credentials
    router.post("/:id", [authJwt.verifyToken, authJwt.isMerchantOrAdmin], credentials.createByUser);

    // Retrieve all Credentials
    router.get("/", [authJwt.verifyToken, authJwt.isMerchantOrAdmin], credentials.findAll);

    // Get a Credentials with user Id
    router.get("/:id", [authJwt.verifyToken, authJwt.isMerchantOrAdmin], credentials.findByUser);

    // Update a Credentials with Id
    router.put("/:id", [authJwt.verifyToken, authJwt.isMerchantOrAdmin], credentials.updateByUser);

    // Delete a Credentials with user Id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isMerchantOrAdmin], credentials.deleteByUser);

    // Delete all Credentials
    router.delete("/", [authJwt.verifyToken, authJwt.isMerchantOrAdmin], credentials.deleteAll);

    app.use('/api/credentials', router);
};
