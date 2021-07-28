const db = require("../models");
const TransactionMongo = require("../models/mongo/transaction");
const TransactionDB = db.transaction;
const Op = db.Sequelize.Op;

const PAYMENT_STATUS = require("../utils/paymentStatus.json")
const fetch = require('node-fetch');


const mongoose = require('mongoose');

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
        userId: req.userId,
        type: PAYMENT_STATUS.PENDING,
        datePending: new Date(Date.now()),
        datePaymentCanceledUser: null,
        datePaymentOkUser: null,
        datePaymentOkPsp: null,
        datePendingRefund: null,
        dateRefundOkUser: null,
        dateRefundOkPsp: null,
        total: req.body.totalPrice,
        cart: req.body.cart,
        currency: req.body.currency,
        consumerLastname: "Foo",
        consumerFirstname: "Bart",
        billingAddress: "1 rue Bouvier",
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

            const response = {
                ...data,
                urlPayment: 'http://0.0.0.0:3000/payment/' + data.id
            };
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Users."
            });
        });
};

exports.totalCurrencyEUR = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    TransactionMongo.count({ "merchant.id": id, "currency": "EUR"}).then((data) => res.json(data));
}

exports.findAll = (req, res) => {

    TransactionDB.findAll()
        .then(data => {
            res.set('Access-Control-Expose-Headers', 'X-Total-Count');
            res.set('X-Total-Count', Array.isArray(data) ? data.length : 1);
            res.send(Array.isArray(data) ? data : [data]);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};


exports.actionPayment = async (req, res) => {
    const type = req.body.type;
    const transaction = await TransactionDB.findOne({
        where: {
            "id": req.params.id,
        }
    });

    console.log("transaction", transaction);

    if (type === PAYMENT_STATUS.PAYMENT_CANCELED_USER) {
        transaction.type = PAYMENT_STATUS.PAYMENT_CANCELED_USER;
        transaction.datePaymentCanceledUser = new Date(Date.now());
        await transaction.save();
        res.send(200);
        // return;
    }

    if (type === PAYMENT_STATUS.PAYMENT_OK_USER) {
        transaction.type = PAYMENT_STATUS.PAYMENT_OK_USER;
        transaction.datePaymentOkUser = new Date(Date.now());
        await transaction.save();

        // Envoie au PSP
        try {
            await fetch('http://0.0.0.0:3003/psp/' + transaction.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (e) {
            console.log('PSP en maintenance')
        }

        res.send(200);
        // return;
    }

};

exports.totalCharts = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    TransactionMongo.count({ "merchant.id": id}).then((data) => res.json(data));
}

exports.totalChartsbyStatusPending = (req, res) => {
    const id = parseInt(req.params.id);
    TransactionMongo.count({ "merchant.id": id, "type": "PENDING"}).then((data) => res.json(data));
}

exports.refund = (req, res) => {
    const id = req.params.id;
    TransactionDB.findByPk(id)
        .then(data => {
            console.log(data);
            if (data.type === 'validated') {
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
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Transaction with id =" + id
            });
        });
};

exports.retourPayment = async (req, res) => {

    const id = req.params.id;

    const transaction = await TransactionDB.findByPk(id);

    transaction.type = PAYMENT_STATUS.PAYMENT_OK_PSP;
    transaction.datePaymentOkPsp = new Date(Date.now());
    await transaction.save();

    // Notifie le serveur de front que l'action est ok
    await fetch('http://0.0.0.0:3005/' + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    res.send(200);

}
