const dbConfig = require("../config/config.json");

const Sequelize = require("sequelize");
const mongoose = require("mongoose");
const Transaction = require("./mongo/transaction");
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
db.transaction = require("../models/transaction.js")(sequelize, Sequelize);

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

db.users.hasMany(db.transaction, {
    foreignKey: "userId",
    as: "transactions"
});

db.transaction.belongsTo(db.users, {
    as: "merchant",
    foreignKey: "userId"
});

db.users.hasOne(db.credential,{
    foreignKey: "userId"
});

db.credential.belongsTo(db.users, {
    as: "credential",
    foreignKey: 'userId'
});

db.ROLES = ["user", "admin", "merchant"];



const denormalizeTransaction = (transaction) => {
    db.transaction.findByPk(transaction.id, {
        include: [{ model: db.users, as: "merchant" }],
        //include: [{ model: Client, as: "client" }],
    }).then(data =>{
        let id = mongoose.Types.ObjectId(data.id);
        console.log(data);
        new Transaction({ _id: id, ...data.toJSON() }).save();
    });
};

db.transaction.addHook("afterUpdate", denormalizeTransaction);
db.transaction.addHook("afterCreate", denormalizeTransaction);

module.exports = db;
