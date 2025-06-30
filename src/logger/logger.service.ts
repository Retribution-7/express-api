import { ILogObj, Logger, ISettingsParam } from 'tslog';
import { ILogger } from './logger.interface';


export class LoggerService implements ILogger {
  public logger: Logger<ILogObj>;

  constructor() {
    const settings: ISettingsParam<ILogObj> = {
      type: 'pretty',
      hideLogPositionForProduction: true
    };

    this.logger = new Logger<ILogObj>(settings);
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  error(...args: unknown[]) {
    this.logger.error(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}
