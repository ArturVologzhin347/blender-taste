import TelegramBot from 'node-telegram-bot-api';

const help: (telegramBot: TelegramBot, chat: number, authorized: boolean) => void = (
    telegramBot,
    chat,
    authorized
) => {
    void (async () => {
        let message: string;

        if(authorized) {
            message = 'HELP'; // TODO 
        } else {
            message = 'Авторизуйся сначала, потом помощи проси. /start';
        }

        await telegramBot.sendMessage(chat, message);
    })();
};

export { help };
