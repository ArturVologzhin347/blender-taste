import log4js from 'log4js';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import Project from '../model/Project';
import TelegramBot from 'node-telegram-bot-api';
import { telegramBot } from '../bot';
import Render from '../model/Render';

const logger = log4js.getLogger('projectService.ts');
const PROJECTS_PATH = path.resolve(process.env['MAIN_FOLDER']);

const getAllProjects: () => Promise<Set<Project>> = async () => {
    return await fs.promises.readdir(PROJECTS_PATH, { withFileTypes: true }).then(async (files) => {
        // dirs && not hiden
        const notHiddenFiles = files.filter((file) => {
            return file.isDirectory() && file.name.charAt(0) !== '.';
        });

        // project dir must contain file with ext .blend
        const isDirProjectMap = await Promise.all(
            notHiddenFiles.map(async (file) => {
                return await fs.promises
                    .readdir(`${PROJECTS_PATH}/${file.name}`, { withFileTypes: true })
                    .then(async (files) => {
                        for (const file of files) {
                            if (file.isFile() && path.extname(file.name) === '.blend') {
                                return await Promise.resolve(true);
                            }
                        }
                        return await Promise.resolve(false);
                    });
            })
        );

        // Filter by predicate map
        const projects: Project[] = notHiddenFiles
            .filter((_v, index) => {
                return isDirProjectMap[index];
            })
            // map to Project model
            .map((projectDir) => {
                const project: Project = {
                    dir: projectDir.name,
                    dirPath: `${PROJECTS_PATH}/${projectDir.name}`,
                };
                return project;
            });

        return await Promise.resolve(new Set(projects));
    });
};

export { getAllProjects };
