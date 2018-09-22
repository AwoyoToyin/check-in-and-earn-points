import { Response } from 'express';

const BadRequest = (res: Response, data: any, message = '', code = 'E_BAD_REQUEST'): Response => {
    return res.status(400).send({
        code,
        message: message || 'The request cannot be fulfilled due to bad syntax',
        data: data || {},
    });
};

export default BadRequest;
