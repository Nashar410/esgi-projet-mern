module.exports = app => {
    const users = require("../controllers/user.js");
    const { authJwt } = require("../middleware");

    var router = require("express").Router();

    // Create a new Users
    router.post("/", users.create);

    // Retrieve all Users
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], users.findAll);

    // Retrieve a single Users with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], users.findOne);

    // Update a Users with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], users.update);

    // Delete a Users with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], users.delete);

    // Delete all Users
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], users.deleteAll);

    app.use('/api/users', router);
};
