import { Router } from 'express';
import WalletConnector from './wallet.connector';

class WalletRouter {

    private router: Router = Router();

    public routes(): Router {

        this.router.get('/spend', WalletConnector.spend);

        return this.router;
    }

}

export default new WalletRouter().routes();
