module.exports = app => {
    const {verifySignUp} = require("../middleware");
    const auth = require("../controllers/auth");

    var router = require("express").Router();

    router.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Users
    router.post(
        "/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        auth.signup
    );

    router.post("/signin", auth.signin);

    router.post('/merchant/signin', auth.merchantSignin);

    app.use('/api/auth', router);
};
