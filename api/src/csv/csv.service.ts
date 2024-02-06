import { Injectable } from '@nestjs/common';
import { CreateCSVFileDTO } from '@csv-analyzer/types';

import { MongoCSVRepository } from './csv.repository';
import { CreateCSVUseCase } from './usecases/create-csv-usecase';

@Injectable()
export class CSVService {
  constructor(private csvRepository: MongoCSVRepository) {}

  createFile(file: CreateCSVFileDTO) {
    const createCsvFileUsecase = new CreateCSVUseCase(this.csvRepository);
    const fileEntity = createCsvFileUsecase.execute(file);
    return fileEntity;
  }
}
