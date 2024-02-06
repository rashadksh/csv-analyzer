import fs from 'fs';
import csvParser from 'csv-parser';

import {
  CSVRepository,
  FileEntity,
  FileEntityState,
  UseCase,
} from '../../types';

export class ParseCSVFileUseCase implements UseCase<FileEntity, void> {
  constructor(private csvFileRepository: CSVRepository) {}

  async execute(file: FileEntity): Promise<void> {
    await this.csvFileRepository.setFileStateById(
      file._id,
      FileEntityState.PARSING
    );

    await new Promise((resolve, reject) => {
      const rows: any[] = [];
      fs.createReadStream(file.path)
        .pipe(csvParser())
        .on('data', (row) => rows.push(row))
        .on('end', async () => {
          resolve(rows);
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    await this.csvFileRepository.setFileStateById(
      file._id,
      FileEntityState.DONE_PARSING
    );
  }
}
