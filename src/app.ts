import { configurate } from "./config";
configurate();

import log4js from "log4js";

const logger = log4js.getLogger("app.ts");

logger.debug("Hello world!");
logger.info("Hello world!");
logger.warn("Hello world!");
logger.error("Hello world!");
