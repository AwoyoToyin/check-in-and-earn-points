import { CheckInModel, ICheckIn } from '.';
import { logger } from '../../../config';
import { IAddress } from '../address';
import { AbstractConnector } from '../core';
import Earning from '../core/model/Earning';

class CheckInConnector extends AbstractConnector {

    protected variable: any = 'Na Wa o';

    constructor() {
        super(CheckInModel);
    }

    /**
     * Checks if a user can be allowed to check-in the current location
     *
     * This just checks against check-ing same position two or more times in a row
     * It also checks the current location against the minimum distance check-ins can be allowed
     * @param current IAddress
     * @returns Promise<boolean>
     */
    public isAllowed = async (current: IAddress): Promise<boolean> => {
        try {
            // const model: any = CheckInModel;
            const lastCheckIn: ICheckIn = await this.model.findOne({ user: current.user }).sort({ created_at: -1 });

            const distance: any = new Earning()
                .getDistance(lastCheckIn, current)
                .distanceSinceLast;

            logger.info(distance);
            if (distance < 1.0) {
                throw new Error('Sorry! You can not check-in right now');
            }

            return true;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

}

export default new CheckInConnector();
