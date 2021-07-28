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

    router.put('/:id', controller.actionPayment);

    router.post('/', controller.create);

    router.get('/', controller.findAll)

    router.post('/psp/:id', controller.retourPayment);

    router.get('/kpis/total/:id', controller.totalCharts);

    router.get('/kpis/total_pending/:id', controller.totalChartsbyStatusPending);

    app.use('/api/transactions', router);
};
