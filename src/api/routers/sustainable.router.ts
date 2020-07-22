import {Router} from 'express';

import {SustainableController} from '../../app/controllers';
import {authTokenMiddleware} from '../middlewares';

const router = Router();

const sustainableController = new SustainableController();

router.get('/', authTokenMiddleware, sustainableController.all);
router.get('/:id', authTokenMiddleware, sustainableController.get);
router.post('/', authTokenMiddleware, sustainableController.create);
router.put('/:id', authTokenMiddleware, sustainableController.update);
router.delete('/:id', authTokenMiddleware, sustainableController.del);

export default router;
