import { Request, Response } from 'express';

import { BadRequest, Created, Forbidden, Negotiate, Ok } from '../../responses';
import { AddressConnector, IAddress } from '../address';
import { CheckInConnector, ICheckIn } from '../checkins';
import { AbstractConnector, EarningModel } from '../core';
import { IWallet, WalletConnector } from '../wallet';
import IPerson from './person.interface';
import PersonModel from './person.model';

// import { logger } from '../../../config';
class PersonConnector extends AbstractConnector {

    constructor() {
        super(PersonModel);
    }

    /**
     * Person Sign Up
     * @param req Request
     * @param res Response
     * @returns Response
     */
    public signup = (req: Request, res: Response): Response => {
        const body: IPerson = req.body || {};

        if (!body.name || !body.username || !body.password) {
            return BadRequest(res);
        }

        return this.model.create(body)
            .then((entity: IPerson) => WalletConnector.create({ owner: entity._id, balance: 0.0 }))
            .then((wallet: IWallet) => this.model.findOneAndUpdate({ _id: wallet.owner }, { wallet: wallet._id }, { new: true }))
            .then((person: IPerson) => Created(res, person))
            .catch((error: any) => Negotiate(res, error));
    }

    /**
     * Set Home Address
     * @param req Request
     * @param res Response
     * @returns Response
     */
    public setAddress = (req: Request, res: Response): Response => {
        const body: IAddress = req.body || {};

        if (!body.owner || !body.formatted || !body.longitude || !body.latitude) {
            return BadRequest(res);
        }

        return this.model.findById(body.owner)
            .then((person: IPerson) => AddressConnector.create(body))
            .then((address: IAddress) => this.model.findOneAndUpdate({ _id: address.owner }, { address: address._id }, { new: true }))
            .then((person: IPerson) => Ok(res, person))
            .catch((error: any) => Negotiate(res, error));
    }

    /**
     * Person Check-in
     * @param req Request
     * @param res Response
     * @returns Response
     */
    public check_in = (req: Request, res: Response): Response => {
        const body: ICheckIn = req.body || {};

        if (!body.owner || !body.formatted || !body.longitude || !body.latitude) {
            return BadRequest(res);
        }

        return this.model.findById(body.owner).populate('address').populate('wallet', 'balance')
            .then((person: IPerson) => {

                if (!person.address.latitude || !person.address.longitude) {
                    return Forbidden(res, {}, 'You must set your address first before you can check-in locations');
                }

                const earning: number[] = new EarningModel()
                    .getDistance(person.address, body)
                    .calculate(person.wallet.balance);

                body.distance = earning[1];
                body.earning = earning[0];

                const balance = person.wallet.balance + body.earning;

                return Promise.all([
                    WalletConnector.updateBalance(person.wallet._id, balance),
                    CheckInConnector.create<ICheckIn>(body),
                ]);
            })
            .then((results: [IWallet, ICheckIn]) => this.model.findById(results[0].owner).populate('wallet', 'balance'))
            .then((person: IPerson) => Ok(res, person))
            .catch((error: any) => Negotiate(res, error));
    }

}

export default new PersonConnector();
