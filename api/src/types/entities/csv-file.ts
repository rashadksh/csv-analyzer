export enum CSVFileEntityState {
  UPLOADED = 'uploaded',
  PARSING = 'parsing',
  DONE_PARSING = 'done_parsing',
  ANALYZING = 'analyzing',
  DONE = 'done',
  FAILED = 'failed',
}

export interface CSVFileEntity {
  _id: string;
  name: string;
  path: string;
  state: CSVFileEntityState;
  header: string[];
  createdAt: Date;
  updatedAt: Date;
}
