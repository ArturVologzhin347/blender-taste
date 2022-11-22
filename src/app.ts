import { configurate } from './config';
configurate();

import log4js from 'log4js';
import { startPolling, telegramBot } from './bot';
import * as handlers from './handlers';
import TelegramBot from 'node-telegram-bot-api';

const logger = log4js.getLogger('app.ts');

handlers.setup(telegramBot);

void (async () => {
    await startPolling().then(() => {
        logger.info('App started!');
    });
})();
