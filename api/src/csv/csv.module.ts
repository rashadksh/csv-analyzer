import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { CSV_ANALYZING_QUEUE_NAME, CSV_PARSING_QUEUE_NAME } from '../constants';
import { InfraModule } from '../infra/infra.module';

import { CSVController } from './csv.controller';
import { CSVService } from './csv.service';
import { MongoCSVFileRepository } from './repositories/csv-file.repository';
import { MongoCSVFileRowRepository } from './repositories/csv-file-row.repository';
import { CSVParsingQueueConsumer } from './queues/csv-parsing-queue.consumer';
import { CSVParsingQueueProducer } from './queues/csv-parsing-queue.producer';
import { CSVAnalyzingQueueProducer } from './queues/csv-analyzing-queue.producer';
import { CSVAnalyzingQueueConsumer } from './queues/csv-analyzing-queue.consumer';

@Module({
  imports: [
    InfraModule,
    BullModule.registerQueue({
      name: CSV_PARSING_QUEUE_NAME,
    }),
    BullModule.registerQueue({
      name: CSV_ANALYZING_QUEUE_NAME,
    }),
  ],
  controllers: [CSVController],
  providers: [
    CSVService,
    MongoCSVFileRepository,
    MongoCSVFileRowRepository,
    CSVParsingQueueProducer,
    CSVParsingQueueConsumer,
    CSVAnalyzingQueueProducer,
    CSVAnalyzingQueueConsumer,
  ],
})
export class CSVModule {}
