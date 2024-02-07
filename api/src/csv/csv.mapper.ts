import { CSVFileModel } from '@csv-analyzer/types';

import { CSVFileEntity } from '../types';

export class CSVFileMapper {
  static dbToJSON(file: CSVFileEntity): CSVFileModel {
    return {
      id: file._id.toString(),
      name: file.name,
      state: file.state,
      header: file.header,
      charts: file.charts,
      updatedAt: file.updatedAt.toISOString(),
      createdAt: file.createdAt.toISOString(),
    };
  }

  static dbToJSONBulk(files: CSVFileEntity[]) {
    return files.map(this.dbToJSON);
  }
}
