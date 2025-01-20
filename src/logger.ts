import winston from 'winston';
const { combine, json, errors } = winston.format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  trace: 6,
};

const logger = winston.createLogger({
  levels,
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    combine(errors(), json()),
  ),
  transports: [new winston.transports.Console()],
});

type LogExceptionInput = {
  event: string;
  error: any;
  captureException?: boolean;
};

export const logException = ({
  event,
  error,
  captureException,
}: LogExceptionInput) => {
  if (error instanceof Error) {
    logger.error({
      event: `${event}.exception`,
      data: {
        name: error.name,
        message: error.message,
      },
    });
    logger.debug({
      event: `${event}.exception`,
      data: { errStack: error.stack },
    });
  } else {
    logger.error({
      event: `${event}.exception`,
      data: {
        error,
      },
    });
  }
};

export default logger;
