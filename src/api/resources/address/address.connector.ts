// import { logger } from '../../../config';
import { AbstractConnector } from '../core';
import AddressModel from './address.model';

class AddressConnector extends AbstractConnector {

    constructor() {
        super(AddressModel);
    }

}

export default new AddressConnector();
