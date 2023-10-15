import { ServerLogger } from "./src/core/logger/logger";
import { Express } from "./src/core/app/express";

export const logger = new ServerLogger();

export class ExpressApplication extends Express {};