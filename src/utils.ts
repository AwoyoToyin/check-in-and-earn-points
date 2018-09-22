import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { appConfig } from './config';

export function getAuthenticated(authorization: any) {
    if (!authorization) {
        return null;
    }

    let authenticated = null;

    const token: string = authorization.replace('Bearer ', '');
    const decoded: any = jwt.verify(token, appConfig.JWT.secret);

    authenticated = decoded.authenticated || authenticated;

    return authenticated;
}

export function hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt);
}

export function isValidPassword(oldPassword: string, newPassword: string): Promise<boolean> {
    return bcrypt.compare(newPassword, oldPassword);
}

export function tokenize(data: any) {
    return jwt.sign(data, appConfig.JWT.secret);
}
