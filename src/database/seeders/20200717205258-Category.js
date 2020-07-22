'use strict';

const table = 'category';
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Insert Data
    return queryInterface.bulkInsert(
      table,
      [
        {name: 'Educación'},
        {name: 'Economia'},
        {name: 'Deportes'},
        {name: 'Política'},
        {name: 'Entretenimiento'},
        {name: 'Salud'},
        {name: 'Juegos'}
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  }
};
