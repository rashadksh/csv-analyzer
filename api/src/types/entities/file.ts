export enum FileEntityState {
  UPLOADED = 'uploaded',
  PROCESSING = 'processing',
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
