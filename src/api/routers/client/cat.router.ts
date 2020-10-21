import {Router} from 'express';

import {CategoryController} from '../../../app/controllers';
import {GenericRouter} from '../router';

const router = Router();
const mainRouter = new GenericRouter(new CategoryController());

// ADD CRUD
mainRouter.CRUDUrls(router);

export default router;
