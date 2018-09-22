import { AbstractConnector } from '../core';
import CheckInModel from './checkin.model';

class CheckInConnector extends AbstractConnector {

    constructor() {
        super(CheckInModel);
    }

}

export default new CheckInConnector();
