'use strict';

const faker = require('faker');
// const CryptoJS = require("crypto-js");

const table = 'users';
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add New Data
    const fakerData = [];
    // for (let index = 0; index < 10; index++) {
    const uid = faker.random.uuid();
    const fullName = faker.name.findName();
    fakerData.push({
      // Model User
      uid,
      fullName,
      email: 'test@kubo.co',
      slug: uid
    });
    // }
    // Insert Data
    return queryInterface.bulkInsert(table, fakerData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  }
};
