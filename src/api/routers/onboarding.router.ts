import {Router} from 'express';

import {OnboardingController} from '../../app/controllers';
import {accessTokenMiddleware} from '../middlewares';

const router = Router();

const onboardingController = new OnboardingController();

router.post('/login', accessTokenMiddleware, onboardingController.login);
router.post('/signup', accessTokenMiddleware, onboardingController.signUp);
// router.get('/confirm-email/:uid', accessTokenMiddleware, onboardingController.confirmEmail);
router.get('/confirm-email/:uid', onboardingController.confirmEmail);
router.post(
  '/recovery-password',
  accessTokenMiddleware,
  onboardingController.recoveryPassword
);
router.post(
  '/check-code',
  accessTokenMiddleware,
  onboardingController.checkCode
);
router.post(
  '/change-password',
  accessTokenMiddleware,
  onboardingController.changePassword
);

export default router;
