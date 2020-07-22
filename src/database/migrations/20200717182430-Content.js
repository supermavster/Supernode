// Don't Touch!!
const path = require('path');

const directoryOfFile = path.join(
  path.join(__dirname, '../../config/migrations.js')
);
const {tableDB, getTableDB, schemaDB} = require(directoryOfFile);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      tableDB('content'),
      schemaDB(
        {
          title: {
            type: Sequelize.STRING,
            defaultValue: false
          },
          subtitle: {
            type: Sequelize.STRING,
            defaultValue: false
          },
          description: {
            type: Sequelize.STRING,
            defaultValue: false
          },
          slug: {
            type: Sequelize.STRING,
            defaultValue: false
          },
          content: {
            type: Sequelize.TEXT,
            defaultValue: false
          },
          datePublish: {
            type: Sequelize.DATE,
            defaultValue: new Date()
          },
          dateApprove: {
            type: Sequelize.DATE,
            allowNull: true
          },
          dateEdit: {
            type: Sequelize.DATE,
            allowNull: true
          },
          isDraw: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
          }
        },
        {
          userClientId: {
            references: {
              model: 'userClient',
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
