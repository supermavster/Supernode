import {Router} from 'express';

import {OnboardingController} from '../../app/controllers';
import {accessTokenMiddleware} from '../middlewares';
import {StudentController} from '../../app/controllers';
import {authTokenMiddleware} from '../middlewares';

const router = Router();

const onboardingController = new OnboardingController();
// Admin
const studentController = new StudentController();

router.post('/login', accessTokenMiddleware, studentController.login);
router.post('/signup', accessTokenMiddleware, studentController.signUp);
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

router.get('/', authTokenMiddleware, studentController.all);
router.get('/:id', authTokenMiddleware, studentController.get);
router.post('/', authTokenMiddleware, studentController.create);
router.put('/:id', authTokenMiddleware, studentController.update);
router.delete('/:id', authTokenMiddleware, studentController.del);

export default router;
