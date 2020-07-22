import {Router} from 'express';

import {ContentController} from '../../app/controllers';
import {authTokenMiddleware} from '../middlewares';

const router = Router();

const contentController = new ContentController();

router.get('/', authTokenMiddleware, contentController.all);
router.get('/:id', authTokenMiddleware, contentController.get);
router.post('/', authTokenMiddleware, contentController.create);
router.put('/:id', authTokenMiddleware, contentController.update);
router.delete('/:id', authTokenMiddleware, contentController.del);

export default router;
