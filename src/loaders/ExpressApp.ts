import cors from 'cors';
import express, {Request, Response, NextFunction} from 'express';
import fileUpload from 'express-fileupload';
import Boom from '@hapi/boom';

import config from '../config';
import apiRouter from '../api/routers';

export class ExpressApp {
  app = express();

  setAppSettings = (): void => {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));

    // Static Routes
    this.app.use(fileUpload({createParentPath: true}));
    this.app.use(express.static(config.STATIC_PUBLIC));
    this.app.use(express.static(config.STATIC_UPLOADS));
  };

  setAppRouter = (): void => {
    this.app.use(
      config.API_PREFIX,
      this.getAppRouter(),
      (
        error: Error,
        _request: Request,
        _response: Response,
        errorHandler: NextFunction
      ): void => {
        // response.status(400).json({
        //   success: false,
        //   error: error.message
        // });
        errorHandler(Boom.badRequest(error.message));
      }
    );
  };

  getAppRouter = () => {
    return apiRouter;
  };

  constructor() {
    // eslint-disable-next-line no-console
    console.info('Start Express');
    this.setAppSettings();
    this.setAppRouter();
  }
}
