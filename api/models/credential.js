'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Credential extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    };
    Credential.init({
        clientToken: DataTypes.STRING,
        clientSecret: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Credential',
    });


    return Credential;
};
