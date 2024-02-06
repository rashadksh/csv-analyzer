import { FileEntity, FileEntityState } from '../entities/file';

export interface CSVRepository {
  insertFile(data: Omit<FileEntity, '_id'>): Promise<FileEntity>;
  setFileStateById(id: string, state: FileEntityState): Promise<FileEntity>;
  getFileById(id: string): Promise<FileEntity | undefined>;
}
