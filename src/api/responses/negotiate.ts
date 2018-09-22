import { Response } from 'express';

import BadRequest from './badRequest';
import Forbidden from './forbidden';
import NotFound from './notFound';
import ServerError from './serverError';

const Negotiate = (res: Response, err: any): Response => {
    let statusCode = 500;
    const body = err;

    try {

        statusCode = err.status || 500;

        // Set the status
        // (should be taken care of by res.* methods, but this sets a default just in case)
        res.status(statusCode);

    } catch (e) { }

    // Respond using the appropriate custom response
    if (statusCode === 403) { return Forbidden(res, body.data, body.message); }
    if (statusCode === 404) { return NotFound(res, body.data, body.message); }
    if (statusCode >= 400 && statusCode < 500) { return BadRequest(res, body.data, body.message); }
    return ServerError(res, body.data, body.message);
};

export default Negotiate;
