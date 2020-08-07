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
      tableDB('users'),
      schemaDB(
        {
          uid: {
            type: Sequelize.STRING(100),
            allowNull: false,
            primaryKey: true
          },
          slug: {
            type: Sequelize.STRING(300),
            allowNull: false
          },
          fullName: {
            type: Sequelize.STRING(100),
            allowNull: false
          },
          email: {
            type: Sequelize.STRING(100),
            allowNull: false
          },
          phone: {
            type: Sequelize.STRING(100),
            allowNull: true
          },
          password: {
            type: Sequelize.STRING(200),
            allowNull: true
          }
          // emailVerified: {
          //     type: Sequelize.BOOLEAN,
          //     allowNull: false,
          //     defaultValue: false,
          // },
          // accountType: {
          //     type: Sequelize.ENUM("ap", "fb", "gm", "ios"),
          //     allowNull: false,
          //     defaultValue: "ap",
          // },
        },
        {
          checkUserId: {
            references: {
              model: 'checkUser',
              key: 'id',
              defaultValue: 1
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
