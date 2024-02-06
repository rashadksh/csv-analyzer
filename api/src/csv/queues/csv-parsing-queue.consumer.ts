import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';

import { CSV_PARSING_QUEUE_NAME } from '../../constants';
import { CSVAnalyzerQueueConsumer } from '../../types/common/queue';
import { CSVFileNotFoundError } from '../../lib/errors/csv-errors';

import { MongoCSVFileRepository } from '../repositories/csv-file.repository';
import { ParseCSVFileUseCase } from '../usecases/parse-csv-usecase';
import { MongoCSVFileRowRepository } from '../repositories/csv-file-row.repository';

@Processor(CSV_PARSING_QUEUE_NAME)
export class CSVParsingQueueConsumer implements CSVAnalyzerQueueConsumer {
  constructor(
    private csvFileRepository: MongoCSVFileRepository,
    private csvFileRowRepository: MongoCSVFileRowRepository
  ) {}

  @Process()
  async handleJob(job: Job<{ id: string }>) {
    Logger.debug(`Started parsing csv file ${job.data.id}`);
    const fileEntity = await this.csvFileRepository.getFileById(job.data.id);
    if (!fileEntity) {
      throw new CSVFileNotFoundError();
    }

    const parseCSVUsecase = new ParseCSVFileUseCase(
      this.csvFileRepository,
      this.csvFileRowRepository
    );
    await parseCSVUsecase.execute(fileEntity);

    Logger.debug(`Done parsing csv file ${job.data.id}`);
  }

  @OnQueueError()
  handleError(error: Error) {
    Logger.error(`Error in ${CSV_PARSING_QUEUE_NAME} - ${error}`);
  }

  @OnQueueFailed()
  handleFailed(job: Job<{ id: string }>, error: Error) {
    Logger.error(
      `Failed parsing file ${job.data.id} in ${CSV_PARSING_QUEUE_NAME} - ${error}`
    );
  }
}
