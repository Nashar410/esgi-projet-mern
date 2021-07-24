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
db.role = require("../models/role.js")(sequelize, Sequelize);
db.credential = require("../models/credential.js")(sequelize, Sequelize);

db.role.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.users.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["user", "admin", "merchant"];

module.exports = db;
