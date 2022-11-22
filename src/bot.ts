import TelegramBot from 'node-telegram-bot-api';
import log4js from 'log4js';

const logger = log4js.getLogger('bot.ts');

const TELEGRAM_TOKEN = process.env['TELEGRAM_TOKEN'];

const telegramBot = new TelegramBot(TELEGRAM_TOKEN, {
    polling: {
        interval: 20,
        autoStart: false,
    },
});

const startPolling: () => Promise<any> = async () => {
    await telegramBot
        .startPolling()
        .then(async () => {
            logger.info('Start Telegram bot polling...');
            return await Promise.resolve();
        })
        .catch(async (e) => {
            logger.error(e);
            return await Promise.reject(e);
        });
};

export { telegramBot, startPolling };
