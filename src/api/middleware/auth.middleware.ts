import {NextFunction, Response, Request} from 'express';

import {OnboardingController} from '../../app/controllers';

const onboardingController = new OnboardingController();

export const authTokenMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  onboardingController.checkAuthToken(request, response, next);
};
