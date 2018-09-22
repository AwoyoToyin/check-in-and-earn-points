import { IAddress } from '../address';

export default interface ICheckIn extends IAddress {
    distance: number;
    earning: number;
}
