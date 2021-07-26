const db = require("../models");
const Credential = db.credential;
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Users
exports.findByUser = (req, res) => {
    const id = req.params.id;

    Credential.findOne({ where: { userId: id }, attributes:["clientToken", "clientSecret"], include: [{model: User, nested: true, as: "credential"}] }).then(data =>{
        const credentials = {
            "clientToken": data.clientToken,
            "clientSecret": data.clientSecret,
        }
        res.send(credentials);
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: "Error retrieving Credentials Users with id=" + id
        });
    });;
}
