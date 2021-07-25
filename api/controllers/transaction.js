const db = require("../models");
const TransactionDB = db.transaction;
const Op = db.Sequelize.Op;

// Create and Save a new Transactions
exports.create = (req, res) => {
    // Validate request
    if (!req.body.type) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Transaction
    const Transation = {
        type: req.body.type,
        total: req.body.total,
        cart: req.body.cart,
        currency: req.body.currency,
        quantity: req.body.quantity,
    };

    // Save Transactions in the database
    TransactionDB.create(Transation)
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

exports.findAll = (req, res) => {

    TransactionDB.findAll()
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
}
