import {Router} from 'express';

import {Controller} from '../../app/controllers/generic';
import {accessTokenMiddleware, authTokenMiddleware} from '../middleware';

export class GenericRouter {
  mainController: Controller;
  constructor(controller: Controller) {
    this.mainController = controller;
  }

  CRUDUrls(router: Router) {
    // CRUD Base
    router.get('/', authTokenMiddleware, this.mainController.all);
    router.get('/all', authTokenMiddleware, this.mainController.all);
    router.get('/:id', authTokenMiddleware, this.mainController.get);
    router.post('/', authTokenMiddleware, this.mainController.create);
    router.put('/:id', authTokenMiddleware, this.mainController.update);

    router.put(
      '/deactivate/:id',
      authTokenMiddleware,
      this.mainController.deactivate
    );

    router.delete('/:id', authTokenMiddleware, this.mainController.del);

    router.get(
      '/:limit/:offset',
      authTokenMiddleware,
      this.mainController.content
    );

    router.put(
      '/change-status/:id',
      authTokenMiddleware,
      this.mainController.changeStatus
    );
  }
}
