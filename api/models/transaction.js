'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Transaction.init({
        type: DataTypes.STRING,
        datePending: DataTypes.DATE,
        datePaymentCanceledUser: DataTypes.DATE,
        datePaymentOkUser: DataTypes.DATE,
        datePaymentOkPsp: DataTypes.DATE,
        datePendingRefund: DataTypes.DATE,
        dateRefundOkUser: DataTypes.DATE,
        dateRefundOkPsp: DataTypes.DATE,
        total: DataTypes.DOUBLE,
        cart: DataTypes.JSON,
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        consumerLastname: DataTypes.STRING,
        consumerFirstname: DataTypes.STRING,
        billingAddress: DataTypes.STRING,
        billingZipCode: DataTypes.STRING,
        billingCity: DataTypes.STRING,
        billingCountry: DataTypes.STRING,
        shippingAddress: DataTypes.STRING,
        shippingZipCode: DataTypes.STRING,
        shippingCity: DataTypes.STRING,
        shippingCountry: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Transaction',
    });
    return Transaction;
};
