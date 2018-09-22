import { INode } from '../core';
import { IUser } from '../user';

export default interface IWallet extends INode {
    balance: number;
    user: IUser;
}
