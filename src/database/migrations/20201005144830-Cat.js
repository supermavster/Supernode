// Don't Touch!!
const path = require('path');

const directoryOfFile = path.join(
  path.join(__dirname, '../../config/migrations.js')
);
const {tableDB, getTableDB, schemaDB} = require(directoryOfFile);

const tableName = tableDB('cat');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      tableName,
      schemaDB({
        name: {
          type: Sequelize.STRING
        },
        image: {
          type: Sequelize.STRING
        },
        slug: {
          type: Sequelize.STRING
        }
      })
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable(getTableDB());
  }
};
