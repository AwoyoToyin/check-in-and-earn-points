import { Request, Response } from 'express-serve-static-core';

import { BadRequest, Negotiate, Ok } from '../../responses';
import { AbstractConnector } from '../core';
import { IUser, UserModel } from '../user';
import IWallet from './wallet.interface';
import WalletModel from './wallet.model';

class WalletConnector extends AbstractConnector {

    constructor() {
        super(WalletModel);
    }

    /**
     * Spend Points
     * @param req Request
     * @param res Response
     * @returns Response
     */
    public spend = (req: Request, res: Response): Response => {
        const body = req.body || {};

        if (!body.user || !body.amount) {
            return BadRequest(res, {}, 'You must specify the user and number of points to spend.');
        }

        const userModel: any = UserModel;

        return userModel.findById(body.user).populate('wallet')
            .then((user: IUser) => {

                const wallet = user.wallet;

                if (body.amount > wallet.balance) {
                    throw new Error('Insufficient Balance!');
                }

                const balance = wallet.balance - body.amount;

                return this.updateBalance(wallet._id, balance);
            })
            .then((wallet: IWallet) => Ok(res, wallet))
            .catch((error: any) => Negotiate(res, error));
    }

    /**
     * Update Wallet Balance
     * @param _id string
     * @param balance number
     * @returns Promise<IWallet>
     */
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
