import merge from 'lodash.merge';

import testing from './environment.test';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
    port: 4000,
    /** Default jwt configuration */
    JWT: {
        expireTime: '30d',
        secret: 'somereallyhardtocracksecret',
    },
    /** Default db configuration */
    db: {
        url: 'mongodb://localhost:27017/points_earner',
    },
    /** Default pagination limit */
    paginate: {
        limit: 10,
    },
};

/** Override above configuration with environment config */
let envConfig = {};

switch (process.env.NODE_ENV) {
    case 'test':
        envConfig = testing;
        break;
    default:
        envConfig = config;
}

export default merge(config, envConfig);
