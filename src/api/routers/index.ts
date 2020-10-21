// Library Base
import router, {Request, Response, NextFunction} from 'express';

import config from '../../config';

import ConfigRouter from './client/config.router';
import OnboardingRouter from './client/onboarding.router';
import CatRouter from './client/cat.router';

const apiRouter = router();

// Routes - Complements
apiRouter.use(`/${config.SHORT_NAME.toLowerCase()}`, ConfigRouter);
apiRouter.use('/onboarding', OnboardingRouter);
apiRouter.use('/cat', CatRouter);

// Exception
apiRouter.all(
  '*',
  (request: Request, response: Response, errorHandler: NextFunction) => {
    errorHandler(new Error('Page not found'));
  }
);

export default apiRouter;
