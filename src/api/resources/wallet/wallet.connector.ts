import { AbstractConnector } from '../core';
import IWallet from './wallet.interface';
import WalletModel from './wallet.model';

class WalletConnector extends AbstractConnector {

    constructor() {
        super(WalletModel);
    }

    public updateBalance = async (_id: string, balance: number): Promise<IWallet> => {
        try {
            const wallet: IWallet = await this.model.findOneAndUpdate({ _id }, { balance }, { new: true });
            return wallet;
        } catch (error) {
            throw error;
        }
    }

}

export default new WalletConnector();
