'use strict';

const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      zip: {
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

    await queryInterface.addIndex(
        'Addresses',
        ['zip']
    )

    await queryInterface.addIndex(
        'Addresses',
        ['city', 'zip']
    )

    return queryInterface.addIndex(
        'Addresses',
        ['zip', 'street']
    )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Addresses');
  }
};