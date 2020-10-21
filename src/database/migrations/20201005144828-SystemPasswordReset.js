// Don't Touch!!
const path = require('path');

const directoryOfFile = path.join(
  path.join(__dirname, '../../config/migrations.js')
);
const {tableDB, getTableDB, schemaDB} = require(directoryOfFile);

const tableName = tableDB('systemPasswordReset');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      tableName,
      schemaDB(
        {
          code: {
            type: Sequelize.STRING
          }
        },
        {
          suid: {
            type: Sequelize.STRING(100),
            references: {
              model: 'systemUsers',
              key: 'suid'
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
