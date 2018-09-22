import { Router } from 'express';
import UserConnector from './user.connector';

class UserRouter {

    private router: Router = Router();

    public routes(): Router {

        this.router.post('/signup', UserConnector.signup);
        this.router.post('/setAddress', UserConnector.setAddress);
        this.router.post('/check_in', UserConnector.check_in);

        return this.router;
    }

}

export default new UserRouter().routes();
