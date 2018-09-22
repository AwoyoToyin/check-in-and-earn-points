import app from './app';
import { appConfig, logger } from './config';

app.listen(appConfig.port, () => {
    logger.info(`Express server listening on PORT: ${appConfig.port}`);
});
