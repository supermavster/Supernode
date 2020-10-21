// Don't Touch!!
const path = require('path');

const directoryOfFile = path.join(
  path.join(__dirname, '../../config/migrations.js')
);
const {tableDB, getTableDB, schemaDB} = require(directoryOfFile);

const tableName = tableDB('systemUserToken');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      tableName,
      schemaDB(
        {
          pushToken: {
            type: Sequelize.STRING(500)
          },
          version: {
            type: Sequelize.STRING
          },
          authToken: {
            type: Sequelize.TEXT
          },
          maxDate: {
            type: Sequelize.DATE
          },
          updated: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
          }
        },
        {
          suid: {
            type: Sequelize.STRING(100),
            references: {
              model: 'systemUsers',
              key: 'suid'
            }
          },
          platformId: {
            references: {
              model: 'platform',
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
