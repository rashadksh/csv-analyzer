import fs from 'fs';
import csvParser from 'csv-parser';

import {
  CSVFileRepository,
  CSVFileEntity,
  CSVFileEntityState,
  UseCase,
  CSVFileRowRepository,
  QueueProducer,
} from '../../types';
import { transformCSVParseOutputToObject } from '../../lib/utils';

export class ParseCSVFileUseCase implements UseCase<CSVFileEntity, void> {
  constructor(
    private csvFileRepository: CSVFileRepository,
    private csvFileRowRepository: CSVFileRowRepository,
    private csvAnalyzingQueueProducer: QueueProducer
  ) {}

  async execute(file: CSVFileEntity): Promise<void> {
    await this.csvFileRepository.setFileStateById(
      file._id,
      CSVFileEntityState.PARSING
    );

    const { header, rows } = await this.parseCSVFile(file.path);

    await this.csvFileRepository.setFileHeaderById(file._id, header);
    await this.csvFileRowRepository.insertFileRows(file._id, rows);

    await this.csvFileRepository.setFileStateById(
      file._id,
      CSVFileEntityState.DONE_PARSING
    );

    await this.csvAnalyzingQueueProducer.addJob({ id: file._id });
  }

  private async parseCSVFile(filePath: string): Promise<{
    header: string[];
    rows: object[];
  }> {
    const [header, ...rows] = await this.parseRawCSVFile(filePath);

    const headerValues = Object.values<string>(header);
    const tranformedRows = this.transformCSVRowsIntoObjects(headerValues, rows);

    return {
      header: headerValues,
      rows: tranformedRows,
    };
  }

  private parseRawCSVFile(filePath: string): Promise<any[]> {
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

  private transformCSVRowsIntoObjects(
    headers: string[],
    rows: object[]
  ): object[] {
    return rows.map((row) => transformCSVParseOutputToObject(headers, row));
  }
}