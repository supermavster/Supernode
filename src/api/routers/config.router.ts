import {Router} from 'express';

import {OnboardingController} from '../../app/controllers';

// Call Controllers
const router = Router();
const onboardingController = new OnboardingController();

// Set Routers
router.get('/generate-access-token', onboardingController.generateAccessToken);

export default router;
