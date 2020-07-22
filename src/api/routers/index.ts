// Library Base
import router, {Request, Response, NextFunction} from 'express';

import config from '../../config';

import ConfigRouter from './config.router';
import OnboardingRouter from './onboarding.router';
import GradeRouter from './grade.router';
import SchoolRouter from './school.router';
import CityRouter from './city.router';
import StudentRouter from './student.router';
import SustainableRouter from './sustainable.router';
import CategoryRouter from './category.router';
import ContentRouter from './content.router';

// // const listEndpoints = require('express-list-endpoints');

const apiRouter = router();

// // Routes - Complements
apiRouter.use(`/${config.SHORT_NAME.toLowerCase()}`, ConfigRouter);
apiRouter.use('/onboarding', OnboardingRouter);
apiRouter.use('/grade', GradeRouter);
apiRouter.use('/school', SchoolRouter);
apiRouter.use('/city', CityRouter);
apiRouter.use('/student', StudentRouter);
apiRouter.use('/sustainable', SustainableRouter);
apiRouter.use('/category', CategoryRouter);
apiRouter.use('/content', ContentRouter);
// // apiRouter.use('/users', UserRouter);

// Exception
apiRouter.all(
  '*',
  (request: Request, response: Response, errorHandler: NextFunction) => {
    errorHandler(new Error('Page not found'));
  }
);

export default apiRouter;
