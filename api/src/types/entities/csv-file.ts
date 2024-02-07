import { CSVFileState } from '@csv-analyzer/types';

export interface CSVFileEntity {
  _id: string;
  name: string;
  path: string;
  state: CSVFileState;
  charts: any[];
  header: string[];
  createdAt: Date;
  updatedAt: Date;
}
