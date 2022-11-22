import { configurate } from './config';
configurate();

import log4js from 'log4js';
import { startPolling, telegramBot } from './bot';
import * as handlers from './handlers';
import { getAllProjects } from './service/projectService';
import { watchRenders } from './service/renderService';

const logger = log4js.getLogger('app.ts');

handlers.setup(telegramBot);

void (async () => {
    await watchRenders(telegramBot);
})();

void (async () => {
    await startPolling().then(async () => {
        logger.info('App started!');
    });
})();
