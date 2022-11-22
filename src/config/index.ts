import { config } from 'dotenv';

function configurate() {
    config({
        override: true,
    });

}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly TELEGRAM_TOKEN: string;
            readonly MAIN_FOLDER: string;
            readonly SECRET_PSWD: string;
        }
    }
}

export { configurate };
