export enum CSVFileState {
  UPLOADED = 'uploaded',
  PARSING = 'parsing',
  DONE_PARSING = 'done_parsing',
  ANALYZING = 'analyzing',
  DONE = 'done',
  FAILED = 'failed',
}

export enum CSVFileChartType {
  NUMBER = 'number',
  PIE = 'pie',
  LINE = 'line',
  BAR = 'bar',
}

export type CSVFileChart = {
  title: string;
  type: CSVFileChartType;
  values: {
    name?: string;
    key?: string;
    value: number;
  }[];
};

export type CSVFileModel = {
  id: string;
  name: string;
  state: CSVFileState;
  header: string[];
  charts: CSVFileChart[];
  updatedAt: string;
  createdAt: string;
};
