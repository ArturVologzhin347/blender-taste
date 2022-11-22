import TelegramBot from 'node-telegram-bot-api';
import log4js from 'log4js';
import { handleStartCommand } from './startHandler';
import { telegramBot } from '../bot';
import { handleHelpCommand } from './helpHandler';
import { handleNotifyCommand } from './notifyHanlder';

const logger = log4js.getLogger('handlers/index.ts');

function handlePollingErrors(telegramBot: TelegramBot) {
    telegramBot.on('polling_error', (error) => {
        logger.warn(error);
    });
}

const setup: (telegramBot: TelegramBot) => void = () => {
    handlePollingErrors(telegramBot); // -> common polling errors logging
    handleStartCommand(telegramBot); // -> /start
    handleHelpCommand(telegramBot); // -> /help
    handleNotifyCommand(telegramBot); // -> /notify
};

export { setup };
