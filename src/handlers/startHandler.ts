import TelegramBot from 'node-telegram-bot-api';
import { telegramBot } from '../bot';

const handleStartCommand: (telegramBot: TelegramBot) => void = (telegramBot) => {
    telegramBot.onText(/\/start/, (message: TelegramBot.Message) => {});
};

export { handleStartCommand };
