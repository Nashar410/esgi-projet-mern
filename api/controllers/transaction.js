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
    const transaction = {
        userId: req.body.userId,
        type: req.body.type,
        total: req.body.totalPrice,
        cart: req.body.cart,
        currency: req.body.currency,
        consumerLastname: "Foo",
        consumerFirstname: "Bart",
        billingAddress:  "1 rue Bouvier",
        billingZipCode: "75011",
        billingCity: "Paris",
        billingCountry: "France",
        shippingAddress: "1 rue Bouvier",
        shippingZipCode: "75011",
        shippingCity: "Paris",
        shippingCountry: "France",
    };

    // Save Transactions in the database
    TransactionDB.create(transaction)
        .then(data => {
            res.send(Array.isArray(data) ? data : [data]);
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
            res.set('X-Total-Count', Array.isArray(data) ? data.length : 1)
            res.send(Array.isArray(data) ? data : [data]);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
}

exports.refund = (req, res) => {
    const id = req.params.id;
    TransactionDB.findByPk(id)
        .then(data =>{
            console.log(data);
            if (data.type === 'validated'){

                data.type = 'refund';
                TransactionDB.update(data, {
                    where: {id: id}
                }).then(num => {
                    if (num == 1) {
                        res.send({
                            message: "transaction was updated successfully."
                        });

                    } else {
                        res.send({
                            message: `Cannot update transaction with id=${id}. Maybe transaction was not found or req.body is empty!`
                        });
                    }
                })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Users with id=" + id
                        });
                    });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error retrieving Transaction with id =" + id
            });
        })
}
