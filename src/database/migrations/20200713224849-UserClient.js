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
      tableDB('userClient'),
      schemaDB(
        {
          name: {
            type: Sequelize.STRING
          },
          lastName: {
            type: Sequelize.STRING
          }
        },
        {
          uid: {
            type: Sequelize.STRING(100),
            references: {
              model: 'users',
              key: 'uid'
            }
          },
          roleId: {
            references: {
              model: 'roleClient',
              key: 'id'
            }
          },
          cityId: {
            references: {
              model: 'city',
              key: 'id'
            }
          },
          schoolId: {
            references: {
              model: 'school',
              key: 'id'
            }
          },
          gradeId: {
            references: {
              model: 'grade',
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
