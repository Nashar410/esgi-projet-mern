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
                urlPayment: 'http://api:3000/api/payment/' + data.id
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
        return;
    }

    if (type === PAYMENT_STATUS.PAYMENT_OK_USER) {
        transaction.type = PAYMENT_STATUS.PAYMENT_OK_USER;
        transaction.datePaymentOkUser = new Date(Date.now());
        await transaction.save();

        // Envoie au PSP
        await fetch('https://psp:3003/psp/' + transaction.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        res.send(200);
        return;
    }

};

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
        .catch(err =>{
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
    await fetch('http://frontserver:3004/'+id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    res.send(200);

}
