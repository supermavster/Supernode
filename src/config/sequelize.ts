import {Sequelize} from 'sequelize';

import config from './index';

const {DATABASE_URL = ''} = config;

const sequelize = new Sequelize(DATABASE_URL);

export default sequelize;
