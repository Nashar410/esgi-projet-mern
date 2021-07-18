'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        kbis: DataTypes.STRING,
        role: DataTypes.STRING,
        devise: DataTypes.STRING,
        contact: DataTypes.STRING,
        company: DataTypes.STRING,
        confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        password: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
