import {Router} from 'express';

import {GradeController} from '../../app/controllers';
import {authTokenMiddleware} from '../middlewares';

const router = Router();

const gradeController = new GradeController();

router.get('/', authTokenMiddleware, gradeController.all);
router.get('/:id', authTokenMiddleware, gradeController.get);
router.post('/', authTokenMiddleware, gradeController.create);
router.put('/:id', authTokenMiddleware, gradeController.update);
router.delete('/:id', authTokenMiddleware, gradeController.del);

export default router;
