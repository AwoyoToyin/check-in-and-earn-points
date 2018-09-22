import { Router } from 'express';
import PersonConnector from './person.connector';

class PersonRouter {

    private router: Router = Router();

    public routes(): Router {

        this.router.get('/here', PersonConnector.ping);
        this.router.post('/signup', PersonConnector.signup);
        this.router.post('/setAddress', PersonConnector.setAddress);
        this.router.post('/check_in', PersonConnector.check_in);

        return this.router;
    }

}

export default new PersonRouter().routes();
