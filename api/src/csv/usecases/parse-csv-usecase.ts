import fs from 'fs';
import csvParser from 'csv-parser';

import {
  CSVFileRepository,
  CSVFileEntity,
  CSVFileEntityState,
  UseCase,
  CSVFileRowRepository,
} from '../../types';

export class ParseCSVFileUseCase implements UseCase<CSVFileEntity, void> {
  constructor(
    private csvFileRepository: CSVFileRepository,
    private csvFileRowRepository: CSVFileRowRepository
  ) {}

  async execute(file: CSVFileEntity): Promise<void> {
    await this.csvFileRepository.setFileStateById(
      file._id,
      CSVFileEntityState.PARSING
    );

    const rows = await new Promise<any[]>((resolve, reject) => {
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

    await this.csvFileRowRepository.insertFileRows(file._id, rows);

    await this.csvFileRepository.setFileStateById(
      file._id,
      CSVFileEntityState.DONE_PARSING
    );
  }
}
