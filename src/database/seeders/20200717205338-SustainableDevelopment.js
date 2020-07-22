'use strict';

const sha1 = require('crypto-js/sha1');
const faker = require('faker');
// const CryptoJS = require("crypto-js");

const table = 'school';
module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add New Data
    const listNames = [
      'Fin de la pobreza',
      'Hambre Cero',
      'Salud y Bienstar',
      'Educación de Calidad',
      'Igualdad de Género',
      'Agua Limpia y Saneamiento',
      'Energia asequible y no contaminante',
      'Trabajo decente y crecimiento económico',
      'Industria, Innovación e Infrastructura',
      'Reducción de las desigualdades',
      'Ciudades y Communidades Sostenibles',
      'Producción y consumo responsable',
      'Acción por el clima',
      'Vida submarina',
      'Vida de ecosistemas terrestres',
      'Paz, justicia e instituciones solidas',
      'Alianza para lograr los objetivos'
    ];
    const fakerData = [];
    for (let index = 0; index < 10; index++) {
      const id = listNames[index];
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
