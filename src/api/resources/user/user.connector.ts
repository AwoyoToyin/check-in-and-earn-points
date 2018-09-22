import { Request, Response } from 'express';

import { BadRequest, Created, Forbidden, Negotiate, Ok } from '../../responses';
import { AddressConnector, IAddress } from '../address';
import { CheckInConnector, ICheckIn } from '../checkins';
import { AbstractConnector, EarningModel } from '../core';
import { IWallet, WalletConnector } from '../wallet';
import IUser from './user.interface';
import UserModel from './user.model';

class UserConnector extends AbstractConnector {

    constructor() {
        super(UserModel);
    }

    /**
     * User Sign Up
     * @param req Request
     * @param res Response
     */
    public signup = (req: Request, res: Response) => {
        const body: IUser = req.body || {};

        if (!body.name || !body.username || !body.password) {
            return BadRequest(res);
        }

        return this.model.create(body)
            .then((entity: IUser) => WalletConnector.create({ user: entity._id }))
            .then((wallet: IWallet) => this.model.findOneAndUpdate({ _id: wallet.user }, { wallet: wallet._id }, { new: true }))
            .then((user: IUser) => Created(res, user))
            .catch((error: any) => Negotiate(res, error));
    }

    /**
     * Set Home Address
     * @param req Request
     * @param res Response
     */
    public setAddress = (req: Request, res: Response) => {
        const body: IAddress = req.body || {};

        if (!body.user || !body.formatted || !body.longitude || !body.latitude) {
            return BadRequest(res);
        }

        return AddressConnector.setHome(body)
            .then((address: IAddress) => {
                return this.model.findOneAndUpdate({ _id: address.user }, { address: address._id }, { new: true })
                    .then((user: IUser) => Ok(res, user));
            })
            .catch((error: any) => Negotiate(res, error));
    }

    /**
     * User Check-in
     * @param req Request
     * @param res Response
     */
    public check_in = (req: Request, res: Response) => {
        const body: ICheckIn = req.body || {};

        if (!body.user || !body.formatted || !body.longitude || !body.latitude) {
            return BadRequest(res);
        }

        return CheckInConnector.isAllowed(body)
            .then(() => {
                return this.model.findById(body.user).populate('address').populate('wallet', 'balance')
                    .then((user: IUser) => {

                        if (!user.address.latitude || !user.address.longitude) {
                            return Forbidden(res, {}, 'You must set your address first before you can check-in locations');
                        }

                        const earning: number[] = new EarningModel()
                            .getDistance(user.address, body)
                            .calculate(user.wallet.balance);

                        body.distance = earning[1];
                        body.earning = earning[0];

                        const balance = user.wallet.balance + body.earning;

                        return Promise.all([
                            WalletConnector.updateBalance(user.wallet._id, balance),
                            CheckInConnector.create<ICheckIn>(body),
                        ]);
                    })
                    .then((results: [IWallet, ICheckIn]) => this.model.findById(results[0].user).populate('wallet', 'balance'))
                    .then((user: IUser) => Ok(res, user));
            })
            .catch((error: any) => Negotiate(res, error));
    }

}

export default new UserConnector();
