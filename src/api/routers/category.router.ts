import {Router} from 'express';

import {CategoryController} from '../../app/controllers';
import {accessTokenMiddleware, authTokenMiddleware} from '../middlewares';

const router = Router();

const categoryController = new CategoryController();

router.get('/all', accessTokenMiddleware, categoryController.all);
router.get('/', authTokenMiddleware, categoryController.all);
router.get('/:id', authTokenMiddleware, categoryController.get);
router.post('/', authTokenMiddleware, categoryController.create);
router.put('/:id', authTokenMiddleware, categoryController.update);
router.delete('/:id', authTokenMiddleware, categoryController.del);

export default router;
