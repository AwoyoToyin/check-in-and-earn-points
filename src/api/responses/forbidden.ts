import { Response } from 'express';

const Forbidden = (res: Response, data: any = {}, message = '', code = 'E_FORBIDDEN'): Response => {
    return res.status(403).send({
        code,
        message: message || 'You are not authorized to perform this operation',
        data: data || {},
    });
};

export default Forbidden;
