const table = 'platform';
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Insert Data
    return queryInterface.bulkInsert(
      table,
      [
        {name: 'Android'},
        {name: 'IOs'},
        {name: 'Flutter'},
        {name: 'Web'},
        {name: 'Api'}
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  }
};
