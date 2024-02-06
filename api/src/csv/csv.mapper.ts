import { CSVFileEntity } from '../types';

export class CSVFileMapper {
  static dbToJSON(file: CSVFileEntity) {
    return {
      id: file._id.toString(),
      name: file.name,
      state: file.state,
      header: file.header,
      updatedAt: file.updatedAt,
      createdAt: file.createdAt,
    };
  }
}
