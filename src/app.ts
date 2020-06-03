import express, { json } from 'express';
import { resolve } from 'path';
import cors from 'cors';

import routes from './routes';

class App {
    public server = express.application;

    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.server.use(json());
        this.server.use(cors());
        this.server.use('/uploads', express.static(resolve(__dirname, '..', 'tmp', 'uploads')));
    };

    private routes(): void {
        this.server.use(routes);
    };
}

export default new App().server;