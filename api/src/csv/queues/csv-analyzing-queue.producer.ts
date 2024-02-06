import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { CSV_ANALYZING_QUEUE_NAME } from '../../constants';
import { QueueProducer } from '../../types/common/queue';

@Injectable()
export class CSVAnalyzingQueueProducer implements QueueProducer {
  constructor(
    @InjectQueue(CSV_ANALYZING_QUEUE_NAME) private analyzingQueue: Queue
  ) {}

  async addJob(
    data: Record<string, unknown> & { id: string }
  ): Promise<{ id: string }> {
    const job = await this.analyzingQueue.add(data, {
      attempts: 3,
      jobId: data.id,
    });

    return { id: job.id.toString() };
  }
}
