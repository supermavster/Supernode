'use strict';

const table = 'roleDev';
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Insert Data
    return queryInterface.bulkInsert(
      table,
      [
        {name: 'Developer - Mobile'},
        {name: 'Developer - Fronted'},
        {name: 'Developer - Backend'},
        {name: 'Developer - Fullstack'}
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  }
};
