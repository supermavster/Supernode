import {Router} from 'express';

import {CatController} from '../../../app/controllers';
import {accessTokenMiddleware} from '../../middlewares';

// Call Controllers
const router = Router();
const catController = new CatController();

// Set Routers
router.get('/', accessTokenMiddleware, catController.all);
// Pagination
router.get(
  '/:filter/:limit/:offset',
  accessTokenMiddleware,
  catController.contentPagination
);

router.get('/:id', accessTokenMiddleware, catController.get);
router.post('/', accessTokenMiddleware, catController.create);
router.put('/:id', accessTokenMiddleware, catController.update);
router.put('/deactivate/:id', accessTokenMiddleware, catController.deactivate);
router.delete('/:id', accessTokenMiddleware, catController.del);

export default router;
