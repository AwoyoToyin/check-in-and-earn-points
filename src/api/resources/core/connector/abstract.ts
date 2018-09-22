import { Request, Response } from 'express';

import { logger } from '../../../../config';
import { Negotiate, NotFound, Ok } from '../../../responses';

export default abstract class AbstractConnector {

    constructor(protected model: any) { }

    /**
     * Ping Connector
     * @param req Request
     * @param res Response
     * @returns Response
     */
    public ping = (req: Request, res: Response): Response => {
        logger.info('Pinging...');
        return Ok(res);
    }

    /**
     * Create an entity
     * @param data T
     * @returns Promise<T>
     */
    public create = async<T> (data: T): Promise<T> => {
        try {
            const entity: T = await this.model.create(data);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find and return a single entity by its ID
     * @param req Request
     * @param res Response
     * @returns Response
     */
    public findOne = (req: Request, res: Response): Response => {
        return this.model.findById(req.query.id)
            .then((entity: any) => {
                if (!entity && !entity._id) {
                    return NotFound(res);
                }
                return Ok(res, entity);
            }).catch((error: any) => Negotiate(res, error));
    }

    /**
     * Returns a collection of the model
     * @param req Request
     * @param res Response
     * @returns Response
     */
    public find = (req: Request, res: Response): Response => {
        const criteria = req.body || {};

        return this.model.find(criteria)
            .then((collection: any) => Ok(res, collection))
            .catch((error: any) => Negotiate(res, error));
    }

    /**
     * Updates an entity
     * @param req Request
     * @param res Response
     * @returns Response
     */
    public update = (req: Request, res: Response): Response => {
        const data = req.body || {};
        const id = req.query.id;
        logger.info('_ID: ', id);

        return this.model.findOneAndUpdate({ _id: id }, data, { new: true })
            .then((entity: any) => Ok(res, entity))
            .catch((error: any) => Negotiate(res, error));
    }

    /**
     * Deletes an entity and return the deleted entity
     * @param req Request
     * @param res Response
     * @returns Response
     */
    public delete = (req: Request, res: Response): Response => {
        const _id = req.query.id || 0;

        return this.model.findOneAndDelete({ _id })
            .then((entity: any) => Ok(res, entity))
            .catch((error: any) => Negotiate(res, error));
    }

    /**
     * Returns a count of all documents of the model
     * @param critertia object
     * @returns Promise
     */
    protected async count(criteria = {}): Promise<number> {
        try {
            const count: number = await this.model.count(criteria);
            return count;
        } catch (error) {
            throw error;
        }
    }
}
