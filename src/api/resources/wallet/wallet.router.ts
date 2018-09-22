import { Router } from 'express';
import WalletConnector from './wallet.connector';

class WalletRouter {

    private router: Router = Router();

    public routes(): Router {

        this.router.get('/here', WalletConnector.ping);

        return this.router;
    }

}

export default new WalletRouter().routes();
