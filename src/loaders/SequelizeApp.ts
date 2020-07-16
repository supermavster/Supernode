// Add Library
import {Sequelize} from 'sequelize';

// import sequelize from '../config/sequelize';
import sequelize from '../config/sequelize.typescript';

export class SequelizeApp {
  databaseConnection = (): Promise<void> => {
    return this.sequelizeAuthenticate();
  };

  databaseSyncConnection = (): Promise<Sequelize> => {
    return this.sequelizeAuthenticate().then(this.sequelizeSync);
  };

  sequelizeSync = (): Promise<Sequelize> => {
    return sequelize.sync({force: false});
  };

  sequelizeAuthenticate = (): Promise<void> => {
    return sequelize.authenticate();
  };

  getSequelize() {
    return sequelize;
  }
}
