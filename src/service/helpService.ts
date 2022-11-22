import TelegramBot from 'node-telegram-bot-api';
import { isNotificationsEnabled } from './renderService';

const help: (telegramBot: TelegramBot, chat: number, authorized: boolean) => void = (
    telegramBot,
    chat,
    authorized
) => {
    void (async () => {
        let message: string;

        if (authorized) {
            const notificationsEnabled = isNotificationsEnabled();
            message =
                '/help -> помощь.\n' +
                '/notify -> включить/выключить уведомления для завершённых рендеров.' +
                '\n\n' +
                `Уведомления: ${notificationsEnabled ? '✅ Включены' : '❌ Отключены'}.`;
        } else {
            message = 'Авторизуйся сначала, потом помощи проси. /start';
        }

        await telegramBot.sendMessage(chat, message);
    })();
};

export { help };
