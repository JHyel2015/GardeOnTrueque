import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import usersRoutes from './routes/userRoutes';
import changeRoutes from './routes/changeRoutes';
import adRoutes from './routes/adRoutes';
import plantRoutes from './routes/plantRoutes';

class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/users', usersRoutes);
        this.app.use('/api/changes', changeRoutes);
        this.app.use('/api/ads', adRoutes);
        this.app.use('/api/plants', plantRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();