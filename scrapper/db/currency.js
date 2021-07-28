const {Schema} = require("mongoose");
const connection = require("../lib/mongo.js");

const CurrencySchema = new Schema({
    scrappingDate: Date,
    rates: Schema.Types.Mixed,
    sourceDevise: String
});
const Currency = connection.model("Currency", CurrencySchema);

module.exports = Currency;
