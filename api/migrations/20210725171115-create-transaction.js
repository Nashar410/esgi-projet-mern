'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transaction', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      type: { type: Sequelize.STRING},
      total: { type: Sequelize.DOUBLE},
      cart: { type: Sequelize.JSON},
      consumerLastname: {type: Sequelize.STRING},
      consumerFirstname: {type: Sequelize.STRING},
      billingAddress: {type: Sequelize.STRING},
      billingZipCode: {type: Sequelize.STRING},
      billingCity: {type: Sequelize.STRING},
      billingCountry: {type: Sequelize.STRING},
      shippingAddress: {type: Sequelize.STRING},
      shippingZipCode: {type: Sequelize.STRING},
      shippingCity: {type: Sequelize.STRING},
      shippingCountry: {type: Sequelize.STRING},
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transaction');
  }
};
