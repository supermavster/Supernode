/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-process-env */
// import DotenvFlow from 'dotenv-flow';

// DotenvFlow.config({path: './environment'});
const DotenvFlow = require('dotenv-flow');

const MailConfig = require('./mail');
const DatabaseConfig = require('./database');

DotenvFlow.config({path: './environment', silent: true});

let database = {};

const processEnv = process.env.ENV || 'local';
switch (processEnv) {
  case 'local':
    database = DatabaseConfig.local;
    break;
  case 'development':
    database = DatabaseConfig.development;
    break;
  case 'test':
    database = DatabaseConfig.test;
    break;
  case 'production':
    database = DatabaseConfig.production;
    break;
}

export default {
  LANGUAGE: process.env.LANGUAGE || 'es',
  ENV: process.env.ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3000,
  BASE_URL: `//${process.env.HOST}:${process.env.PORT}`,
  BASE_URL_FILES:
    process.env.BASE_URL_FILES ||
    `http://${process.env.HOST}:${process.env.PORT}`,
  EMAIL: process.env.GMAIL_SERVICE_NAME || 'ingeniero.miguelvargas@gmail.com',
  PROJECT: process.env.PROJECT || 'Kubo',
  SHORT_NAME: process.env.SHORT_NAME || 'KB',
  API_PREFIX: `/api/v${process.env.VERSION || 1}`,
  STATIC_PUBLIC: './public',
  STATIC_UPLOADS: process.env.STATIC_UPLOADS || './uploads',
  MAIL: MailConfig,
  DATABASE: {
    // @ts-ignore
    DATABASE_SYSTEM: database.dialect,
    // @ts-ignore
    DB_SERVER_HOST: database.host,
    // @ts-ignore
    DB_NAME: database.database,
    // @ts-ignore
    DB_USERNAME: database.username,
    // @ts-ignore
    DB_USER_PASSWORD: database.password,
    // @ts-ignore
    // eslint-disable-next-line radix
    DB_SERVER_PORT: parseInt(database.port!!) || 33060
  },
  DATABASE_URL:
    // @ts-ignore
    `${database.dialect}://${database.username}:${database.password}@${database.host}:${database.port}/${database.database}` ||
    '',
  SENTRY_CONSOLE: process.env.SENTRY_CONSOLE || false,
  SENTRY_DSN: process.env.SENTRY_DSN || '',
  AWS: {
    AWS_ENABLE: process.env.AWS_ENABLE || false,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || '',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
};
