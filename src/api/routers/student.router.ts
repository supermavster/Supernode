import {Router} from 'express';

import {StudentController} from '../../app/controllers';
import {authTokenMiddleware} from '../middlewares';

const router = Router();

const studentController = new StudentController();

router.get('/', authTokenMiddleware, studentController.all);
router.get('/:id', authTokenMiddleware, studentController.get);
router.post('/', authTokenMiddleware, studentController.create);
router.put('/:id', authTokenMiddleware, studentController.update);
router.delete('/:id', authTokenMiddleware, studentController.del);

export default router;
