import type { LoggerService } from '@nestjs/common';
import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class SilenceLogger extends ConsoleLogger implements LoggerService {
    public constructor() {
        super();
        if (!process.env.DISABLE_NEST_LOGGER) {
            this.setLogLevels([]);
        }
    }
}
