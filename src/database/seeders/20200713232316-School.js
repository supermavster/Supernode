'use strict';

const sha1 = require('crypto-js/sha1');
const faker = require('faker');
// const CryptoJS = require("crypto-js");

const table = 'school';
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add New Data
    const fakerData = [];
    for (let index = 0; index < 10; index++) {
      const id = faker.random.uuid();
      const name = faker.name.findName();
      fakerData.push({
        // Model User
        name,
        slug: sha1(id).toString()
      });
    }
    // Insert Data
    return queryInterface.bulkInsert(table, fakerData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(table, null, {});
  }
};
