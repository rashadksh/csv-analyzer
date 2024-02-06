import { CSVFileEntity, CSVFileEntityState } from '../entities/csv-file';

export interface CSVFileRepository {
  insertFile(
    data: Omit<CSVFileEntity, '_id' | 'header'>
  ): Promise<CSVFileEntity>;
  setFileStateById(
    id: string,
    state: CSVFileEntityState
  ): Promise<CSVFileEntity>;
  setFileHeaderById(id: string, header: string[]): Promise<CSVFileEntity>;
  getFileById(id: string): Promise<CSVFileEntity | undefined>;
}
