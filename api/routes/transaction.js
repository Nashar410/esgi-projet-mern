const authJWT = require('../middleware/authJwt');

module.exports = app => {
    const controller = require('../controllers/transaction');

    var router = require("express").Router();

    router.post('/', [authJWT.verifyToken], controller.create);

    router.get('/', [authJWT.verifyToken], controller.findAll)

    app.use('/api/transactions', router);
};
