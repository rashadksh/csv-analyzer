import { Injectable } from '@nestjs/common';
import { CreateCSVFileDTO } from '@csv-analyzer/types';

import { OpenAIService } from '../infra/openai.service';

import { MongoCSVFileRepository } from './repositories/csv-file.repository';
import { CreateCSVUseCase } from './usecases/create-csv-usecase';
import { CSVParsingQueueProducer } from './queues/csv-parsing-queue.producer';
import { GetCSVFileUseCase } from './usecases/get-csv-usecase';
import { GetAllCSVFilesUseCase } from './usecases/get-all-csv-usecase';
import { AskCSVUseCase } from './usecases/ask-csv-usecase';
import { MongoCSVFileRowRepository } from './repositories/csv-file-row.repository';

@Injectable()
export class CSVService {
  constructor(
    private csvRepository: MongoCSVFileRepository,
    private csvFileRowRepository: MongoCSVFileRowRepository,
    private csvParsingQueueProducer: CSVParsingQueueProducer,
    private openAIService: OpenAIService
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

  async talkToCSVFileById(id: string, question: string) {
    const getCsvFileUsecase = new AskCSVUseCase(
      this.csvFileRowRepository,
      this.openAIService
    );
    const answer = await getCsvFileUsecase.execute({ fileId: id, question });
    return answer;
  }
}
