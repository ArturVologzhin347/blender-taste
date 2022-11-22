import { config } from "dotenv";
import log4js from "log4js";

const log4jsConfiguration: log4js.Configuration = {
  appenders: {
    tofile: { type: "file", filename: "log/logs.log" },
    out: { type: "stdout" },
  },
  categories: {
    default: { appenders: ["out", "tofile"], level: "debug" },
  },
};

function configurate() {
  config({
    override: true,
  });

  log4js.configure(log4jsConfiguration);
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
