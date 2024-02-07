import { CSVFileState } from '@csv-analyzer/types';

import { CSVFileEntity } from '../entities/csv-file';

export interface CSVFileRepository {
  insertFile(
    data: Omit<CSVFileEntity, '_id' | 'header'>
  ): Promise<CSVFileEntity>;
  setFileStateById(id: string, state: CSVFileState): Promise<CSVFileEntity>;
  setFileHeaderById(id: string, header: string[]): Promise<CSVFileEntity>;
  setFileCharts(id: string, charts: any[]): Promise<CSVFileEntity>;
  getAllFiles(): Promise<CSVFileEntity[]>;
  getFileById(id: string): Promise<CSVFileEntity | undefined>;
}
