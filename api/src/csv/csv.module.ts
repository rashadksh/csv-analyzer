import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { CSV_PARSING_QUEUE_NAME } from '../constants';
import { InfraModule } from '../infra/infra.module';

import { CSVController } from './csv.controller';
import { CSVService } from './csv.service';
import { MongoCSVFileRepository } from './repositories/csv-file.repository';
import { MongoCSVFileRowRepository } from './repositories/csv-file-row.repository';
import { CSVParsingQueue } from './csv-parsing.queue';

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
    CSVParsingQueue,
  ],
})
export class CSVModule {}
