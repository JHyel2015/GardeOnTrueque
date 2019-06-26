import express, { Router } from 'express';

import adsController from '../controllers/adsController';

class AdRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', adsController.list);
        this.router.get('/:user_id/:id_anuncio', adsController.getOne);
        this.router.post('/', adsController.create);
        this.router.put('/:id_anuncio', adsController.update);
        // this.router.delete('/:id', usersController.delete);
    }

}

export default new AdRoutes().router;