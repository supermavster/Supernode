// Don't Touch!!
const path = require('path');

const directoryOfFile = path.join(
  path.join(__dirname, '../../config/migrations.js')
);
const {tableDB, getTableDB, schemaDB} = require(directoryOfFile);

const tableName = tableDB('systemUsers');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      tableName,
      schemaDB(
        {
          suid: {
            type: Sequelize.STRING(100),
            allowNull: false,
            primaryKey: true
          },
          fullName: {
            type: Sequelize.STRING(100),
            allowNull: false
          },
          email: {
            type: Sequelize.STRING(100),
            allowNull: false
          },
          password: {
            type: Sequelize.STRING(200),
            allowNull: true
          },
          image: {
            type: Sequelize.STRING(200),
            allowNull: true
          },
          slug: {
            type: Sequelize.STRING(300),
            allowNull: true
          }
        },
        {
          roleId: {
            references: {
              model: 'systemUsersRoles',
              key: 'id'
            },
            defaultValue: 1
          },
          checkUserId: {
            references: {
              model: 'checkUser',
              key: 'id'
            },
            defaultValue: 1
          }
        }
      )
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable(getTableDB());
  }
};
