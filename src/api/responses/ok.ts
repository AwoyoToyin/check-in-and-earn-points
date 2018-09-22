import { Response } from 'express';

const Ok = (res: Response, data: any = {}, message = '', code = 'OK'): Response => {
    return res.status(200).send({
        code,
        message: message || 'Operation is successfully executed',
        data: data || {},
    });
};

export default Ok;
