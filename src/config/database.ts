/* eslint-disable no-process-env */
module.exports = {
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
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql'
  }
};
