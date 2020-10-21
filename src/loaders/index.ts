import Http from 'http';

import config from '../config';

import {ExpressApp} from './ExpressApp';
import {SequelizeApp} from './SequelizeApp';
import {ApiDocApp} from './ApiDocApp';
import {SentryApp} from './SentryApp';

export class Server {
  expressApp = new ExpressApp();
  httpServer: Http.Server;
  sequelizeApp = new SequelizeApp();
  sentryApp = new SentryApp();
  apiDocApp: ApiDocApp;

  runServer = (): Promise<void | Http.Server> => {
    this.sentryApp.init();
    return this.sequelizeApp
      .databaseConnection()
      .then(this.serverListen)
      .catch(this.serverErrorHandler);
  };

  serverListen = (): Http.Server => {
    const {PORT: port, HOST: host} = config;
    // eslint-disable-next-line no-console
    console.info('Start Server', `Server listener: http://${host}:${port}/`);
    return this.httpServer.listen(port, (): void => {});
  };

  serverErrorHandler = (error: Error): void => {
    // eslint-disable-next-line no-console
    console.error('Server run error: ', error.message);
  };

  constructor() {
    const expressApp = this.expressApp;
    this.httpServer = new Http.Server(expressApp.app);
    this.apiDocApp = new ApiDocApp(expressApp.app, expressApp.getAppRouter());
  }
}
