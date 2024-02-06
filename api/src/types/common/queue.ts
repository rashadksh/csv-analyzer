export interface CSVAnalyzerQueue {
  addJob(
    data: Record<string, unknown> & { id: string }
  ): Promise<{ id: string }>;
}
