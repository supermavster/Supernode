'use strict';

// Don't Touch!!
const path = require('path');

const directoryOfFile = path.join(
  path.join(__dirname, '../../config/migrations.js')
);
const {tableDB, getTableDB, schemaDB} = require(directoryOfFile);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      tableDB('project'),
      schemaDB(
        {
          title: {
            type: Sequelize.STRING
          },
          changelog: {
            type: Sequelize.TEXT
          },
          version: {
            type: Sequelize.STRING
          },
          deployment: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: new Date()
          },
          required: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }
        },
        {
          platformId: {
            references: {
              model: 'platform',
              key: 'id'
            }
          },
          userDevId: {
            references: {
              model: 'userDev',
              key: 'id'
            }
          }
        }
      )
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable(getTableDB());
  }
};
