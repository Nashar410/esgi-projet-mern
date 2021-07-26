const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const db = require("../models");
const User = db.users;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.development.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!", err
            });
        }
        req.userId = decoded.id;
        next();
    });
};

verifyBasicToken = (req, res, next) => {
    let authorization = req.headers["authorization"];
    const [clientId, clientSecret] = atob(authorization.split('Basic ')[1]).split(':');

    if (!authorization) {
        return res.status(403).send({
            message: "No authorization provided!"
        });
    }

    if (clientId && clientSecret) {
        next();
    } else {
        res.status(401).send({
            message: "Unauthorized!"
        });
    }
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

isMerchant = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "merchant") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require merchant Role!"
            });
        });
    });
};

isMerchantOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "merchant") {
                    next();
                    return;
                }

                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require merchant or Admin Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    verifyBasicToken: verifyBasicToken,
    isAdmin: isAdmin,
    isMerchant: isMerchant,
    isMerchantOrAdmin: isMerchantOrAdmin
};
module.exports = authJwt;
