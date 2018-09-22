import mongoose from 'mongoose';

import { appConfig, logger } from '../src/config';

mongoose.Promise = global.Promise;

const clearDatabase = async () => {
    await mongoose.connection.db.dropDatabase();
};

const connectDb = () => {
    mongoose.connect(appConfig.db.url);
    mongoose.connection
        .once('open', () => logger.info('Test Mongodb running'))
        .on('error', () => logger.error('Test MongoDB connection error'));
};

const disconnectDb = async () => {
    await clearDatabase();
    logger.info('Test Mongodb cleared');
    return mongoose.disconnect();
};

export {
    connectDb,
    disconnectDb,
    mongoose,
};
