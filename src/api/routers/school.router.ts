import {Router} from 'express';

import {SchoolController} from '../../app/controllers';
import {authTokenMiddleware} from '../middlewares';

const router = Router();

const schoolController = new SchoolController();

router.get('/', authTokenMiddleware, schoolController.all);
router.get('/:id', authTokenMiddleware, schoolController.get);
router.post('/', authTokenMiddleware, schoolController.create);
router.put('/:id', authTokenMiddleware, schoolController.update);
router.delete('/:id', authTokenMiddleware, schoolController.del);

export default router;
