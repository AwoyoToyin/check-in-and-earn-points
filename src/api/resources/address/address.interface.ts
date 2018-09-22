import { INode } from '../core';
import { IPerson } from '../person';

export default interface IAddress extends INode {
    formatted?: string;
    latitude?: string;
    longitude?: string;
    owner?: IPerson;
}
