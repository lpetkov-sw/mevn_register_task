'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      salutation: {
          type: Sequelize.STRING
      },
      firstName: {
          type: Sequelize.STRING
      },
      lastName: {
          type: Sequelize.STRING
      },
      email: {
          type: Sequelize.STRING
      },
      birthday: {
          type: Sequelize.DATE
      },
      streetNo: {
          type: Sequelize.INTEGER
      },
      zipcode: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};