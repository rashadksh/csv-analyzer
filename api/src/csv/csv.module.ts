import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { CSV_PARSING_QUEUE_NAME } from '../constants';
import { InfraModule } from '../infra/infra.module';

import { CSVController } from './csv.controller';
import { CSVService } from './csv.service';
import { MongoCSVRepository } from './csv.repository';
import { CSVParsingQueue } from './csv-parsing.queue';

@Module({
  imports: [
    InfraModule,
    BullModule.registerQueue({
      name: CSV_PARSING_QUEUE_NAME,
    }),
  ],
  controllers: [CSVController],
  providers: [CSVService, MongoCSVRepository, CSVParsingQueue],
})
export class CSVModule {}
