import TelegramBot from 'node-telegram-bot-api';
import { clientIsExists } from '../service/authService';
import { notificationEnabledThumble } from '../service/renderService';

const handleNotifyCommand: (telegramBot: TelegramBot) => void = (telegramBot) => {
    telegramBot.onText(/\/notify/, (message: TelegramBot.Message) => {
        const chat = message.chat.id;

        void (async () => {
            const isNotificationsEnabled = notificationEnabledThumble();

            await telegramBot.sendMessage(
                chat,
                `Уведомления: ${isNotificationsEnabled ? '✅' : '❌'}`
            );
        })();
    });
};

export { handleNotifyCommand };
