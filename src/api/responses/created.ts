import { Response } from 'express';

const Created = (res: Response, data: any = {}, code = 'CREATED', message = ''): Response => {
    return res.status(201).send({
        code,
        message: message || 'The request has been fulfilled and resulted in a new resource being created',
        data: data || {},
    });
};

export default Created;
