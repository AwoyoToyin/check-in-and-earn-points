import { Response } from 'express';

const Unathorized = (res: Response, data: any = {}, message = '', code = 'E_UNAUTHORIZED'): Response => {
    return res.status(401).send({
        code,
        message: message || 'Missing or invalid authentication token',
        data: data || {},
    });
};

export default Unathorized;
