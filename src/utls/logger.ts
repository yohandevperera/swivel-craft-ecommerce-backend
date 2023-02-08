import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { Format } from 'logform';
import {
  FileTransportOptions,
  FileTransportInstance,
  ConsoleTransportInstance,
} from 'winston/lib/winston/transports';

interface LoggerConfig {
  format: Format;
  transports: Array<FileTransportInstance | ConsoleTransportInstance>;
}

interface LogFileTransportOptions {
  infoFile: FileTransportOptions;
  errorFile: FileTransportOptions;
}

type LogLevels = 'info' | 'error' | 'alert' | 'warning' | 'debug';

const logFormat = winston.format.printf(
  (info: winston.Logform.TransformableInfo) => `${info.level}: ${info.message}`,
);

const logTransportOptions: LogFileTransportOptions = {
  infoFile: {
    level: 'info',
    filename: 'logs/info.log', // later change the file name format and fetch from env
    handleExceptions: true,
    tailable: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  errorFile: {
    level: 'info',
    filename: 'logs/error.log', // later change the file name format and fetch from env
    handleExceptions: true,
    tailable: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
};

const loggerConfig: LoggerConfig = {
  format: winston.format.combine(
    winston.format.label({
      label: `Employee-Manager`, // add running env
    }),
    winston.format.timestamp(),
    winston.format.colorize(),
    logFormat
  ),
  transports: [
    new winston.transports.File(logTransportOptions.infoFile),
    new winston.transports.File(logTransportOptions.errorFile),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
    }),
  ],
};

const winstonInstance = winston.createLogger({
  ...loggerConfig,
});

export const systemLogger = WinstonModule.createLogger({
  instance: winstonInstance,
});
