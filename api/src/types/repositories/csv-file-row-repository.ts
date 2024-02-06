import { CSVFileRowEntity } from '../entities/csv-file-row';

export interface CSVFileRowRepository {
  insertFileRows(fileId: string, rows: any[]): Promise<CSVFileRowEntity[]>;
  getFileRowsById(fileId: string): Promise<CSVFileRowEntity[]>;
}
