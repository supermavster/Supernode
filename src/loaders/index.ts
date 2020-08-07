import Http from 'http';

import config from '../config';

import {ExpressApp} from './ExpressApp';
import {SequelizeApp} from './SequelizeApp';
import {ApiDocApp} from './ApiDocApp';

export class Server {
  expressApp = new ExpressApp();
  httpServer: Http.Server;
  sequelizeApp = new SequelizeApp();
  apiDocApp: ApiDocApp;

  runServer = (): Promise<void | Http.Server> => {
    return this.sequelizeApp
      .databaseConnection()
      .then(this.serverListen)
      .catch(this.serverErrorHandler);
  };

  serverListen = (): Http.Server => {
    const {PORT: port, HOST: host} = config;
    return this.httpServer.listen(port, (): void => {});
  };

  serverErrorHandler = (error: Error): void => {
    console.error('Server run error: ', error.message);
  };

  constructor() {
    const expressApp = this.expressApp;
    this.httpServer = new Http.Server(expressApp.app);
    this.apiDocApp = new ApiDocApp(expressApp.app, expressApp.getAppRouter());
  }
}
