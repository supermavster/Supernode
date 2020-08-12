import {Router} from 'express';

import {OnboardingController} from '../../app/controllers';
import {accessTokenMiddleware, authTokenMiddleware} from '../middlewares';

const router = Router();

const onboardingController = new OnboardingController();

router.post('/signup', accessTokenMiddleware, onboardingController.signUp);
router.post('/login', accessTokenMiddleware, onboardingController.login);
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
router.get('/profile', authTokenMiddleware, onboardingController.profile);

export default router;
