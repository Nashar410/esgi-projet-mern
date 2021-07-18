const dbConfig = require("../config/config.json");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.development.database,
    dbConfig.development.username,
    dbConfig.development.password, {
        host: dbConfig.development.host,
        port: dbConfig.development.port,
        dialect: dbConfig.development.dialect,
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user")(sequelize, Sequelize);

module.exports = db;
