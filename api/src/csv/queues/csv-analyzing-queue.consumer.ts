import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';

import { CSV_ANALYZING_QUEUE_NAME } from '../../constants';
import { QueueConsumer } from '../../types/common/queue';
import { MongoCSVFileRepository } from '../repositories/csv-file.repository';
import { MongoCSVFileRowRepository } from '../repositories/csv-file-row.repository';
import { GenerateCSVFileChartsUseCase } from '../usecases/generate-csv-charts.usecase';
import { OpenAIService } from '../../infra/openai.service';

@Processor(CSV_ANALYZING_QUEUE_NAME)
export class CSVAnalyzingQueueConsumer implements QueueConsumer {
  constructor(
    private csvFileRepository: MongoCSVFileRepository,
    private csvFileRowRepository: MongoCSVFileRowRepository,
    private openAIService: OpenAIService
  ) {}

  @Process()
  async handleJob(job: Job<{ id: string }>) {
    Logger.debug(`Started analyzing csv file ${job.data.id}`);

    const generateCSVFileChartsUsecase = new GenerateCSVFileChartsUseCase(
      this.csvFileRepository,
      this.csvFileRowRepository,
      this.openAIService
    );
    await generateCSVFileChartsUsecase.execute(job.data.id);

    Logger.debug(`Done analyzing csv file ${job.data.id}`);
  }

  @OnQueueError()
  handleError(error: Error) {
    Logger.error(`Error in ${CSV_ANALYZING_QUEUE_NAME} - ${error}`);
  }

  @OnQueueFailed()
  handleFailed(job: Job<{ id: string }>, error: Error) {
    Logger.error(
      `Failed analyzing file ${job.data.id} in ${CSV_ANALYZING_QUEUE_NAME} - ${error}`
    );
  }
}
