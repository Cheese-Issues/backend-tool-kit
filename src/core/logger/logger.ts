import { Config } from "../config/config";
// @ts-ignore
import fs from "fs";

type LoggerLevelsTypes = "info" | "alert" | "error" | "job";

interface LogData {
    timestamp: string;
    level: LoggerLevelsTypes;
    message: string;
}

export class ServerLogger {
    private readonly stdout: NodeJS.WriteStream;
    private readonly logFile: string;
    private logData: LogData[] = [];

    public constructor() {
        this.stdout = process.stdout;
        this.logFile = "logs.json";
    }

    public info(message: string): void {
        this.write(message, "info");
    }

    public alert(message: string): void {
        this.write(message, "alert");
    }

    public error(message: string): void {
        this.write(message, "error");
    }

    public job(message: string): void {
        this.write(message, "job");
    }

    private write(message: string, level: LoggerLevelsTypes): void {
        let logMessage = `[${ new Date().toISOString() }] [${ this.getColor(level)(level.toUpperCase()) }] ${ message }`;
        this.stdout.write(logMessage + "\n");

        if (Config.saveLogs === false) {
            return;
        }

        const logData: LogData = {
            timestamp: new Date().toISOString(),
            level,
            message,
        };

        this.logData.push(logData);

        try {
            fs.writeFileSync(this.logFile, JSON.stringify(this.logData, null, 2));
        } catch (err) {
            console.error(err);
        }
    }

    private getColor(level: LoggerLevelsTypes): (text: string) => string {
        const colors: Record<LoggerLevelsTypes, string> = {
            info: "\x1b[32m",
            alert: "\x1b[33m",
            error: "\x1b[31m",
            job: "\x1b[34m"
        };

        const resetColor = "\x1b[0m";

        return (text: string) => `${ colors[level] }${ text }${ resetColor }`;
    }
}