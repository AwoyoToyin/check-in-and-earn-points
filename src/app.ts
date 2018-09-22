import * as bodyParser from 'body-parser';
import express from 'express';

import { UserRouter, WalletRouter } from './api/resources';
import { DB } from './config';

class App {

    public app: express.Application;

    constructor() {
        this.app = express();

        this.openDBConnection();
        this.config();
        this.registerRouters();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private registerRouters(): void {
        this.app.use('/user', UserRouter);
        this.app.use('/wallet', WalletRouter);
    }

    private openDBConnection(): void {
        DB.connect();
    }

}

export default new App().app;
