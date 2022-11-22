import { configurate } from './config';
configurate();

import log4js from 'log4js';
import { startPolling, telegramBot } from './bot';
import * as handlers from './handlers';
import TelegramBot from 'node-telegram-bot-api';
import { getAllProjects } from './service/projectService';

const logger = log4js.getLogger('app.ts');

handlers.setup(telegramBot);

void (async () => {
    await getAllProjects().then((projects) => {
        console.log(projects);
    });
})();

void (async () => {
    await startPolling().then(async () => {
        logger.info('App started!');
    });
})();
