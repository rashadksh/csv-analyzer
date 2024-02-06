import { Job, Queue } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue, Process, Processor } from '@nestjs/bull';

import { CSV_PARSING_QUEUE_NAME } from '../constants';
import { CSVAnalyzerQueue } from '../types/common/queue';
import { CSVFileNotFoundError } from '../lib/errors/csv-errors';

import { MongoCSVRepository } from './csv.repository';
import { ParseCSVFileUseCase } from './usecases/parse-csv-usecase';

@Injectable()
@Processor(CSV_PARSING_QUEUE_NAME)
export class CSVParsingQueue implements CSVAnalyzerQueue {
  constructor(
    private csvFileRepository: MongoCSVRepository,
    @InjectQueue(CSV_PARSING_QUEUE_NAME) private parsingQueue: Queue
  ) {}

  async addJob(
    data: Record<string, unknown> & { id: string }
  ): Promise<{ id: string }> {
    const job = await this.parsingQueue.add(data, {
      attempts: 3,
      jobId: data.id,
    });

    return { id: job.id.toString() };
  }

  @Process()
  async handleCSVParsingJob(job: Job<{ id: string }>) {
    Logger.debug(`Started parsing csv file ${job.data.id}`);
    const fileEntity = await this.csvFileRepository.getFileById(job.data.id);
    if (!fileEntity) {
      throw new CSVFileNotFoundError();
    }

    const parseCSVUsecase = new ParseCSVFileUseCase(this.csvFileRepository);
    await parseCSVUsecase.execute(fileEntity);

    Logger.debug(`Done parsing csv file ${job.data.id}`);
  }
}
