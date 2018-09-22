import { INode } from '../core';
import { IUser } from '../user';

export default interface IAddress extends INode {
    formatted: string;
    latitude: string;
    longitude: string;
    user: IUser;
}
