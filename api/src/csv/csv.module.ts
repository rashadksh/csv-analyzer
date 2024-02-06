import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { CSV_PARSING_QUEUE_NAME } from '../constants';
import { InfraModule } from '../infra/infra.module';

import { CSVController } from './csv.controller';
import { CSVService } from './csv.service';
import { MongoCSVFileRepository } from './repositories/csv-file.repository';
import { MongoCSVFileRowRepository } from './repositories/csv-file-row.repository';
import { CSVParsingQueueConsumer } from './queues/csv-parsing-queue.consumer';
import { CSVParsingQueueProducer } from './queues/csv-parsing-queue.producer';

@Module({
  imports: [
    InfraModule,
    BullModule.registerQueue({
      name: CSV_PARSING_QUEUE_NAME,
    }),
  ],
  controllers: [CSVController],
  providers: [
    CSVService,
    MongoCSVFileRepository,
    MongoCSVFileRowRepository,
    CSVParsingQueueProducer,
    CSVParsingQueueConsumer,
  ],
})
export class CSVModule {}
