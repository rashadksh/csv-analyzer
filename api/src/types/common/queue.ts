export interface CSVAnalyzerQueueProducer {
  addJob(
    data: Record<string, unknown> & { id: string }
  ): Promise<{ id: string }>;
}

export interface CSVAnalyzerQueueConsumer {
  handleJob(job: any): Promise<unknown>;
  handleError(error: Error): void;
  handleFailed(job: any, error: Error): void;
}
