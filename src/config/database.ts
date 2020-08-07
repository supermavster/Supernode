/* eslint-disable no-process-env */
const DotenvFlow = require('dotenv-flow');

DotenvFlow.config({path: './environment'});

module.exports = {
  local: {
    username: process.env.LOC_DB_USERNAME || 'root',
    password: process.env.LOC_DB_PASSWORD || 'secret',
    database: process.env.LOC_DB_NAME || 'test',
    host: process.env.LOC_DB_HOSTNAME || '127.0.0.1',
    dialect: process.env.LOC_DB_SYSTEM || 'mysql',
    port: process.env.LOC_DB_PORT || 33060
  },
  development: {
    username: process.env.DEV_DB_USERNAME || 'root',
    password: process.env.DEV_DB_PASSWORD || 'secret',
    database: process.env.DEV_DB_NAME || 'test',
    host: process.env.DEV_DB_HOSTNAME || '127.0.0.1',
    dialect: process.env.DEV_DB_SYSTEM || 'mysql',
    port: process.env.DEV_DB_PORT || 33060
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.PROD_DB_USERNAME || 'root',
    password: process.env.PROD_DB_PASSWORD || 'secret',
    database: process.env.PROD_DB_NAME || 'test',
    host: process.env.PROD_DB_HOSTNAME || '127.0.0.1',
    dialect: process.env.PROD_DB_SYSTEM || 'mysql',
    port: process.env.PROD_DB_PORT || 3306
  }
};
