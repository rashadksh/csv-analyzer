export enum FileEntityState {
  UPLOADED = 'uploaded',
  PARSING = 'parsing',
  DONE_PARSING = 'done_parsing',
  ANALYZING = 'analyzing',
  DONE = 'done',
  FAILED = 'failed',
}

export interface FileEntity {
  _id: string;
  name: string;
  path: string;
  state: FileEntityState;
  createdAt: Date;
  updatedAt: Date;
}
