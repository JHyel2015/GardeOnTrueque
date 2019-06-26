import express, { Router } from 'express';

import plantsController from '../controllers/plantsController';

class PlantRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', plantsController.list);
        this.router.get('/:user_id/:id_planta', plantsController.getOne);
        this.router.post('/', plantsController.create);
        this.router.put('/:id_planta', plantsController.update);
        // this.router.delete('/:id', usersController.delete);
    }

}

export default new PlantRoutes().router;