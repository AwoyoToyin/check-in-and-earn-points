import mongoose from 'mongoose';

import appConfig from './environment';
import logger from './logger';

class DB {

    public connect() {
        mongoose.connect(appConfig.db.url);
        mongoose.Promise = global.Promise;

        mongoose.connection
            .once('open', () => logger.info('Mongodb running'))
            .on('error', () => logger.error('MongoDB connection error'));
    }
}

export default new DB();
