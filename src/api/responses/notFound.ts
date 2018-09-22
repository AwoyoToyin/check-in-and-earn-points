import { Response } from 'express';

const NotFound = (res: Response, data: any = {}, message = '', code = 'E_NOT_FOUND'): Response => {
    return res.status(404).send({
        code,
        message: message || 'The requested resource could not be found but may be available again in the future',
        data: data || {},
    });
};

export default NotFound;
