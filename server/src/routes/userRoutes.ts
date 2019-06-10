import express, { Router } from 'express';

import usersController from '../controllers/usersController';

class UserRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', usersController.list);
        this.router.get('/:id', usersController.getOne);
        this.router.post('/', usersController.create);
        this.router.put('/:id', usersController.update);
        this.router.delete('/:id', usersController.delete);
    }

}

export default new UserRoutes().router;