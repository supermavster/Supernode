// Library Base
import router, {Request, Response, NextFunction} from 'express';

// Config Variables (ENV)
import config from '../../config';

// Routers
import ConfigRouter from './config.router';
import OnboardingRouter from './onboarding.router';
import CatRouter from './cat.router';

// Controller
const apiRouter = router();

// Routes - Complements
apiRouter.use(`/${config.SHORT_NAME.toLowerCase()}`, ConfigRouter);
apiRouter.use('/onboarding', OnboardingRouter);
// Example CRUD:
apiRouter.use('/cat', CatRouter);

// Exception
apiRouter.all(
  '*',
  (request: Request, response: Response, errorHandler: NextFunction) => {
    errorHandler(new Error('Page not found'));
  }
);

export default apiRouter;
