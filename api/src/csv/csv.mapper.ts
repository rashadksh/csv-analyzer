import { FileEntity } from '../types';

export class CSVFileMapper {
  static dbToJSON(file: FileEntity) {
    return {
      id: file._id.toString(),
      name: file.name,
      state: file.state,
      updatedAt: file.updatedAt,
      createdAt: file.createdAt,
    };
  }
}
