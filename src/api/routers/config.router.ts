import {Router} from 'express';

import {OnboardingController} from '../../app/controllers';

const router = Router();

const onboardingController = new OnboardingController();

router.get('/generate-access-token', onboardingController.generateAccessToken);
// // router.put('/:id', ExampleController.update);
// // router.delete('/:id', ExampleController.del);
// // router.post('/', ExampleController.create);

export default router;
