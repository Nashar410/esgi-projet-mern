const db = require("../models");
const config = require("../config/config");
const User = db.users;
const Role = db.role;
const Credential = db.credential;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        ... req.body,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        kbis: req.body.kbis,
        company: req.body.company,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
        .then(async user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(async roles => {
                    await user.setRoles(roles);
                });
            } else {
                // user role = 1
                await user.setRoles([1]);
            }

            // Resend OK
            res.status(200).send({message: "User was registered successfully!", user});

        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    confirmed: user.confirmed,
                    roles: authorities,
                    secret: userCred.clientSecret,
                    accessToken: userCred.clientToken
                });
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.merchantSignin = async (req, res) => {

    // extraction et vérif du token
        const user = await User.findOne({
            where: {
                "id": req.body.clientId,
            }
        });
        const credential = await user.getCredential();

        if(credential.clientSecret === req.body.clientSecret){
            res.status(200).send({message: "Logged !" });
        } else {
            res.status(404).send({message: "User Not found."});
        }
}

async function generateCredentials (user) {

    const clientToken = jwt.sign({id: `${user.id}`}, config.development.secret, {
        expiresIn: 86400 // 24 hours
    });
    const clientSecret = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
    const credentials = await Credential.create({
        clientSecret,
        clientToken
    });
    await user.setCredential(credentials);
    await user.save();
    return await user.getCredential();
}
