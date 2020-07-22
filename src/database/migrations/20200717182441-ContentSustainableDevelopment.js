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
      tableDB('contentSustainableDevelopment'),
      schemaDB(
        {},
        {
          contentId: {
            references: {
              model: 'content',
              key: 'id'
            }
          },
          sustainableDevelopmentId: {
            references: {
              model: 'sustainableDevelopment',
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
