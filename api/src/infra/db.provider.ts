import { MongoClient } from 'mongodb';
import { FactoryProvider, Logger } from '@nestjs/common';

import { DI } from '../di';
import { ConfigService } from './config.service';

export const dbFactory: FactoryProvider = {
  provide: DI.DB,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const url = configService.getMongodbConnectionString();
    const dbName = configService.getMongodbDabaseName();

    const client = new MongoClient(url);
    await client.connect();

    Logger.log(`Connected to database ${dbName}`);
    return client.db(dbName);
  },
};
