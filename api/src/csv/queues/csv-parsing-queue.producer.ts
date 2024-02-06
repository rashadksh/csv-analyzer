import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { CSV_PARSING_QUEUE_NAME } from '../../constants';
import { CSVAnalyzerQueueProducer } from '../../types/common/queue';

@Injectable()
export class CSVParsingQueueProducer implements CSVAnalyzerQueueProducer {
  constructor(
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
}
