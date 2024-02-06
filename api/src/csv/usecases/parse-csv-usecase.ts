import fs from 'fs';
import csvParser from 'csv-parser';

import {
  CSVFileRepository,
  CSVFileEntity,
  CSVFileEntityState,
  UseCase,
  CSVFileRowRepository,
} from '../../types';
import { transformCSVParseOutputToObject } from '../../lib/utils';

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

    const [header, ...rows] = await this.parseCSVFile(file.path);

    const headerValues = Object.values<string>(header);
    await this.csvFileRepository.setFileHeaderById(file._id, headerValues);

    const rowsObjects = rows.map((row) =>
      transformCSVParseOutputToObject(headerValues, row)
    );
    await this.csvFileRowRepository.insertFileRows(file._id, rowsObjects);
    await this.csvFileRepository.setFileStateById(
      file._id,
      CSVFileEntityState.DONE_PARSING
    );
  }

  private parseCSVFile(filePath: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const rows: any[] = [];
      fs.createReadStream(filePath)
        .pipe(
          csvParser({
            headers: true,
          })
        )
        .on('data', (row) => rows.push(row))
        .on('end', async () => {
          resolve(rows);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
