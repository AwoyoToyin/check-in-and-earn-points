import { INode } from '../core';
import { IPerson } from '../person';

export default interface IWallet extends INode {
    balance: number;
    owner: IPerson | string;
}
