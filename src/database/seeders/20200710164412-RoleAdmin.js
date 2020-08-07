'use strict';

const table = 'roleAdmin';
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Insert Data
    return queryInterface.bulkInsert(
      table,
      [{name: 'superadmin'}, {name: 'admin'}, {name: 'qualifier'}],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  }
};
