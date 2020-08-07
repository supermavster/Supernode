import {NextFunction, Response, Request} from 'express';

import {OnboardingController} from '../../app/controllers';

const onboardingController = new OnboardingController();

export const accessTokenMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => onboardingController.checkAccessToken(request, response, next);
