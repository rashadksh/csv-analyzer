import { Injectable } from '@nestjs/common';
import { CreateCSVFileDTO } from '@csv-analyzer/types';

import { MongoCSVRepository } from './csv.repository';
import { CreateCSVUseCase } from './usecases/create-csv-usecase';
import { CSVParsingQueue } from './csv-parsing.queue';

@Injectable()
export class CSVService {
  constructor(
    private csvRepository: MongoCSVRepository,
    private csvParsingQueue: CSVParsingQueue
  ) {}

  async createFile(file: CreateCSVFileDTO) {
    const createCsvFileUsecase = new CreateCSVUseCase(
      this.csvRepository,
      this.csvParsingQueue
    );
    const fileEntity = await createCsvFileUsecase.execute(file);
    return fileEntity;
  }
}
