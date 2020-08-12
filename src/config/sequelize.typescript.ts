import {Sequelize} from 'sequelize-typescript';
import {Options} from 'sequelize/types';

import config from './index';

const {
  DATABASE_SYSTEM,
  DB_SERVER_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_USER_PASSWORD,
  DB_SERVER_PORT
} = config.DATABASE;

const path = require('path');

const dirPath = [path.join(__dirname, '../app/models')];

const CONFIG_SEQUELIZE: Options = {
  // @ts-ignore
  models: dirPath,
  host: DB_SERVER_HOST,
  port: DB_SERVER_PORT,
  dialect: DATABASE_SYSTEM || 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
  // repositoryMode: true
};

const sequelize = new Sequelize(
  DB_NAME,
  DB_USERNAME,
  DB_USER_PASSWORD,
  CONFIG_SEQUELIZE
);

export default sequelize;
