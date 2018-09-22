import { Response } from 'express';

const ServerError = (res: Response, data: any, message = '', code = 'E_INTERNAL_SERVER_ERROR'): Response => {
    return res.status(500).send({
        code,
        message: message || 'Something bad happened on the server',
        data: data || {},
    });
};

export default ServerError;
