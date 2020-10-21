import {Router} from 'express';

import {OnboardingController} from '../../../app/controllers';
import {accessTokenMiddleware, authTokenMiddleware} from '../../middleware';

const router = Router();

const onboardingController = new OnboardingController();

router.post('/signup', accessTokenMiddleware, onboardingController.signUp);
router.get('/confirm-email/:suid', onboardingController.confirmEmail);
router.post('/login', accessTokenMiddleware, onboardingController.login);
router.get('/profile', authTokenMiddleware, onboardingController.profile);

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

router.post(
  '/validation-email',
  accessTokenMiddleware,
  onboardingController.validationEmail
);

export default router;
