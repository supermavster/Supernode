import {Router} from 'express';

import {OnboardingController} from '../../../app/controllers';

const router = Router();

const onboardingController = new OnboardingController();

router.get('/generate-access-token', onboardingController.generateAccessToken);

export default router;
