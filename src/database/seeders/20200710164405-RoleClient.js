'use strict';

const table = 'roleClient';
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Insert Data
    return queryInterface.bulkInsert(
      table,
      [{name: 'director'}, {name: 'student'}],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  }
};
