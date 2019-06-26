import express, { Router } from 'express';

import changesController from '../controllers/changesController';

class ChangeRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', changesController.list);
        this.router.get('/:user_id/:id_cambio', changesController.getOne);
        this.router.post('/', changesController.create);
        this.router.put('/:id_cambio', changesController.update);
        // this.router.delete('/:id', usersController.delete);
    }

}

export default new ChangeRoutes().router;