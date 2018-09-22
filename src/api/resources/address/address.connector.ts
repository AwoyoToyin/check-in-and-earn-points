import { IAddress } from '.';
import { AbstractConnector } from '../core';
import AddressModel from './address.model';

class AddressConnector extends AbstractConnector {

    constructor() {
        super(AddressModel);
    }

    /**
     * Set Home Address
     * @param data T
     * @returns Promise<T>
     */
    public setHome = async (data: IAddress): Promise<IAddress> => {
        try {
            let entity: IAddress = await this.model.findOneAndUpdate({ user: data.user }, data, { new: true });

            if (!entity || !entity._id) {
                entity = await this.create<IAddress>(data);
            }

            return entity;
        } catch (error) {
            throw error;
        }
    }

}

export default new AddressConnector();
