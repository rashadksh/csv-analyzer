import { FileEntity } from '../entities/file';

export interface CSVRepository {
  insertFile(data: Omit<FileEntity, '_id'>): Promise<FileEntity>;
  getFileById(id: string): Promise<FileEntity | undefined>;
}
