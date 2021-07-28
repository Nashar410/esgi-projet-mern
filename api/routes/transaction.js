const authJWT = require('../middleware/authJwt');

module.exports = app => {
    const controller = require('../controllers/transaction');

    var router = require("express").Router();

    router.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    });


    router.post('/', [authJWT.verifyBasicToken], controller.create);

    router.get('/', [authJWT.verifyBasicToken], controller.findAll);

    router.get('/kpis/total/:id', controller.totalCharts);

    router.get('/kpis/total_pending/:id', controller.totalChartsbyStatusPending);

    app.use('/api/transactions', router);
};
