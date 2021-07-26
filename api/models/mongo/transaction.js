const {Schema} = require("mongoose");
const connection = require("../../lib/mongo");

const TransactionSchema = new Schema({
    type: String,
    total: Number,
    currency: String,
    quantity: Number,
    merchant: Array,
    client: Array,
    cart: Schema.Types.Mixed
});
const Transaction = connection.model("Transaction", TransactionSchema);

module.exports = Transaction;
