import {Router} from 'express';

import {CityController} from '../../app/controllers';
import {authTokenMiddleware} from '../middlewares';

const router = Router();

const cityController = new CityController();

router.get('/', authTokenMiddleware, cityController.all);
router.get('/:id', authTokenMiddleware, cityController.get);
router.post('/', authTokenMiddleware, cityController.create);
router.put('/:id', authTokenMiddleware, cityController.update);
router.delete('/:id', authTokenMiddleware, cityController.del);

export default router;
