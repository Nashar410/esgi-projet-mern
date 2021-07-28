'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                "firstName": "Thomas",
                "lastName": "Lemoine",
                "email": "contact@thomaslemoine.net",
                "username": "tlemoine",
                "kbis": "32672677",
                "devise": null,
                "contact": null,
                "company": null,
                "confirmed": false,
                "password": "12345678",
                "roles": ["admin"]
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
