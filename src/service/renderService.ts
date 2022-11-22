import log4js from 'log4js';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import TelegramBot from 'node-telegram-bot-api';
import isImage from 'is-image';
import Render from '../model/Render';
import { getAllProjects } from './projectService';
import { getAllClients } from './authService';

const logger = log4js.getLogger('renderService.ts');

let notificationEnabled = true;

const isNotificationsEnabled: () => boolean = () => {
    return notificationEnabled;
};

const notificationEnabledThumble: () => boolean = () => {
    notificationEnabled = !notificationEnabled;
    return notificationEnabled;
};

const sendRender: (telegramBot: TelegramBot, render: Render) => void = async (
    telegramBot,
    render
) => {
    if (!notificationEnabled) {
        return;
    }

    const clients = await getAllClients();

    for (const client of clients) {
        await telegramBot.sendPhoto(client, render.path, {}, {});
        //await telegramBot.sendDocument(client, render.path, {}, { filename: render.name, contentType: '' });
    }
};

const watchRenders: (telegramBot: TelegramBot) => Promise<void> = async (telegramBot) => {
    const projects = await getAllProjects();

    for (const project of projects) {
        const rendersPath = `${project.dirPath}/renders`;

        // /renders should be exists
        if (!fs.existsSync(rendersPath)) {
            logger.info(`create renders dir in project ${project.dir}`);
            await fs.promises.mkdir(rendersPath, { recursive: false });
        }

        chokidar.watch(rendersPath, { ignoreInitial: true }).on('add', async (filePath) => {
            const fileIsImage = isImage(filePath);
            logger.info(`${fileIsImage ? 'Image' : 'File (not image)'} detected: ${filePath}`);

            if (!fileIsImage) {
                return;
            }

            const render: Render = {
                project: project.dir,
                name: path.basename(filePath),
                path: filePath,
                rendertime: 'none',
            };

            sendRender(telegramBot, render);
        });
    }
};

export { watchRenders, isNotificationsEnabled, notificationEnabledThumble };
