const db = require("../models");
const Users = db.users;
const Role = db.role;
const Op = db.Sequelize.Op;

// Create and Save a new Users
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstName) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Users
    const User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        kbis: req.body.kbis,
        role: req.body.role,
        devise: req.body.devise,
        contact: req.body.contact,
        company: req.body.company,
        confirmed: req.body.confirmed,
        password: req.body.password,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
    };

    // Save Users in the database
    Users.create(User)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Users."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    Users.findAll({where: condition})
        .then(data => {
            res.set('Access-Control-Expose-Headers', 'X-Total-Count')
            res.set('X-Total-Count', data.length)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};

// Retrieve all awaiting Users from the database.
exports.findAllAwaiting = (req, res) => {
    var condition = {confirmed: false};

    Users.findAll({
        where: {confirmed: false, roleId: 2},
        include: [{model: Role, nested: true, as: "role"}]
    })
        .then(data => {
            res.set('Access-Control-Expose-Headers', 'X-Total-Count')
            res.set('X-Total-Count', data.length)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};


// Find a single Users with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Users.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Users with id=" + id
            });
        });
};

// Update a Users by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Users.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Users was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Users with id=${id}. Maybe Users was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Users with id=" + id
            });
        });
};

// Delete a Users with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Users.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Users was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Users with id=${id}. Maybe Users was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Users with id=" + id
            });
        });
};

// Delete all Userss from the database.
exports.deleteAll = (req, res) => {
    Users.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Users were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Userss."
            });
        });
};
