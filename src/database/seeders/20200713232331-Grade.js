'use strict';

const table = 'grade';
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Insert Data
    return queryInterface.bulkInsert(
      table,
      [
        {name: '3° Primaria'},
        {name: '4° Primaria'},
        {name: '5° Primaria'},
        {name: '6° Primaria'},
        {name: '7° Primaria'}
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  }
};
