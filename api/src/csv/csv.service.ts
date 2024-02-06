import { Injectable } from '@nestjs/common';
import { CreateCSVFileDTO } from '@csv-analyzer/types';

import { MongoCSVFileRepository } from './repositories/csv-file.repository';
import { CreateCSVUseCase } from './usecases/create-csv-usecase';
import { CSVParsingQueueProducer } from './queues/csv-parsing-queue.producer';
import { GetCSVFileUseCase } from './usecases/get-csv-usecase';
import { GetAllCSVFilesUseCase } from './usecases/get-all-csv-usecase';

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

  async getFileById(id: string) {
    const getCsvFileUsecase = new GetCSVFileUseCase(this.csvRepository);
    const fileEntity = await getCsvFileUsecase.execute(id);
    return fileEntity;
  }

  async getAllCSVFiles() {
    const getCsvFileUsecase = new GetAllCSVFilesUseCase(this.csvRepository);
    const fileEntities = await getCsvFileUsecase.execute();
    return fileEntities;
  }
}
