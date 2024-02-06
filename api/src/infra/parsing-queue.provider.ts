import Bull from 'bull';
import { FactoryProvider, Logger } from '@nestjs/common';

import { DI } from '../di';
import { ConfigService } from './config.service';

export const parsingQueueFactory: FactoryProvider = {
  provide: DI.PARSING_QUEUE,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const host = configService.getRedisHost();
    const port = configService.getRedisPort();

    const queueName = 'parsing-queue';
    const queue = new Bull(queueName, {
      redis: {
        host,
        port,
      },
    });

    Logger.log(`Created parsing queue at ${host}:${port}`);

    return queue;
  },
};
