import { ListenOptions } from "./types";
// @ts-ignore
import express from "express";

export class Express {
    public static instance: express.Express | null = null;

    public constructor() {
        if (Express.instance === null) {
            Express.instance = express();
        }
    }

    public getInstance(): express.Express {
        return Express.instance;
    }

    public listen(options: ListenOptions, callback: () => void): void {
        Express.instance.listen(options.port, options.host, () => {
            callback();
        });
    }
}