import { CSVFileEntity, CSVFileEntityState } from '../entities/csv-file';

export interface CSVRepository {
  insertFile(data: Omit<CSVFileEntity, '_id'>): Promise<CSVFileEntity>;
  setFileStateById(
    id: string,
    state: CSVFileEntityState
  ): Promise<CSVFileEntity>;
  getFileById(id: string): Promise<CSVFileEntity | undefined>;
}
