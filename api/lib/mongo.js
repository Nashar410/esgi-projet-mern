const mongoose = require("mongoose");
const dbConfig = require("../config/config.json");

mongoose
    .connect(dbConfig.development.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: "admin",
    })
    .then(() => console.log("mongo connected"));

module.exports = mongoose.connection;