import { AbstractConnector } from '../core';
import WalletModel from './wallet.model';

class WalletConnector extends AbstractConnector {

    constructor() {
        super(WalletModel);
    }

}

export default new WalletConnector();
