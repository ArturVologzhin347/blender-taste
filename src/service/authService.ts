import log4js from 'log4js';
import fs from 'fs';
import path from 'path';

const logger = log4js.getLogger('authService.ts');

const DATA_DIR = path.resolve('./data');
const CLIENTS_PATH = `${DATA_DIR}/clients.txt`;

enum AuthResultCode {
    NOT_AUTHORIZED = 'NOT_AUTHORIZED',
    AUTHORIZED = 'AUTHORIZED',
    ALREADY_AUTHORIZED = 'ALREADY_AUTHORIZED',
}

const clientIsExists: (chat: number) => Promise<boolean> = async (chat) => {
    return await getAllClients()
        .then(async (clients) => {
            return await Promise.resolve(clients.includes(chat));
        })
        .catch(async (e) => {
            logger.warn(e);
            return await Promise.resolve(false);
        });
};

const getAllClients: () => Promise<number[]> = async () => {
    if (fs.existsSync(CLIENTS_PATH)) {
        return await fs.promises
            .readFile(CLIENTS_PATH, { encoding: 'utf-8' })
            .then(async (buffer) => {
                const clients: number[] = buffer
                    .trim()
                    .split(/[\r\n]+/)
                    .map((s) => {
                        return Number(s);
                    });

                return await Promise.resolve(clients);
            })
            .catch(async (e) => {
                return await Promise.reject(e);
            });
    } else {
        return await Promise.resolve([]);
    }
};

const addClient: (chat: number) => Promise<void> = async (chat) => {
    return await fs.promises.appendFile(CLIENTS_PATH, `${String(chat)}\n`, { encoding: 'utf-8' });
};

const authorize: (chat: number, password: string | undefined) => Promise<AuthResultCode> = async (
    chat,
    password
) => {
    if (await clientIsExists(chat)) {
        return await Promise.resolve(AuthResultCode.ALREADY_AUTHORIZED);
    }

    if (password !== undefined && password != null) {
        const currentPassword = process.env['SECRET_PSWD'];

        if (password === currentPassword) {
            await addClient(chat);
            return await Promise.resolve(AuthResultCode.AUTHORIZED);
        }
    }

    return await Promise.resolve(AuthResultCode.NOT_AUTHORIZED);
};

export { authorize, AuthResultCode, clientIsExists };
