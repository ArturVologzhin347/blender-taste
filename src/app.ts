import { configurate } from './config';
configurate();

import log4js from 'log4js';
import { startPolling, telegramBot } from './bot';
import TelegramBot from 'node-telegram-bot-api';

const logger = log4js.getLogger('app.ts');

telegramBot.onText(/\/start/, (message: TelegramBot.Message) => {
    logger.debug(message.chat.id);
});

void (async () => {
  await startPolling().then(() => {
    logger.info('App started!');
  });
})();
