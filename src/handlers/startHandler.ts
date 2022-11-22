import TelegramBot from 'node-telegram-bot-api';
import { authorize, AuthResultCode, clientIsExists } from '../service/authService';
import { help } from '../service/helpService';

const handleStartCommand: (telegramBot: TelegramBot) => void = (telegramBot) => {
    telegramBot.onText(/\/start/, (message: TelegramBot.Message) => {
        const chat = message.chat.id;

        void (async () => {
            if (await clientIsExists(chat)) {
                help(telegramBot, chat, false)
                return;
            }

            const message = 'Введите пароль:';
            const passwordPrompt = await telegramBot.sendMessage(chat, message, {
                reply_markup: {
                    force_reply: true,
                },
            });

            telegramBot.onReplyToMessage(chat, passwordPrompt.message_id, async (message) => {
                const password = message.text?.trim();
                await authorize(chat, password).then(async (code) => {
                    let message: string;
                    switch (code) {
                        case AuthResultCode.ALREADY_AUTHORIZED: {
                            message = 'Вы уже авторизовались, /help для помощи.';
                            break;
                        }

                        case AuthResultCode.NOT_AUTHORIZED: {
                            message =
                                'Неверный пароль. Извольте удалиться из этого чата, либо снова введите /start для ещё одной попытки.';
                            break;
                        }

                        case AuthResultCode.AUTHORIZED: {
                            message =
                                'Вы успешно угадали пароль, пользуйтесь на здоровье. /help для помощи.';
                            break;
                        }
                    }

                    await telegramBot.sendMessage(chat, message);
                });
            });
        })();
    });
};

export { handleStartCommand };
