import { Injectable } from '@nestjs/common';
import { CreateCSVFileDTO } from '@csv-analyzer/types';

import { MongoCSVFileRepository } from './repositories/csv-file.repository';
import { CreateCSVUseCase } from './usecases/create-csv-usecase';
import { CSVParsingQueueProducer } from './queues/csv-parsing-queue.producer';

@Injectable()
export class CSVService {
  constructor(
    private csvRepository: MongoCSVFileRepository,
    private csvParsingQueueProducer: CSVParsingQueueProducer
  ) {}

  async createFile(file: CreateCSVFileDTO) {
    const createCsvFileUsecase = new CreateCSVUseCase(
      this.csvRepository,
      this.csvParsingQueueProducer
    );
    const fileEntity = await createCsvFileUsecase.execute(file);
    return fileEntity;
  }
}
