import TelegramBot from 'node-telegram-bot-api';
import { clientIsExists } from '../service/authService';
import { help } from '../service/helpService';

const handleHelpCommand: (telegramBot: TelegramBot) => void = (telegramBot) => {
    telegramBot.onText(/\/help/, async (message: TelegramBot.Message) => {
        const chat = message.chat.id;
        help(telegramBot, chat, await clientIsExists(chat));
    });
};

export { handleHelpCommand };
