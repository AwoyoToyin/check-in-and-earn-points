import { IAddress } from '../address';
import { INode } from '../core';
import { IWallet } from '../wallet';

export default interface IPerson extends INode {
    name?: string;
    username?: string;
    password?: string;
    wallet?: IWallet;
    address?: IAddress;
    token?: string;
    active?: boolean;
}
