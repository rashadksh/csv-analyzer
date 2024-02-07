import { json2csv } from 'json-2-csv';
import { CSVFileState } from '@csv-analyzer/types';

import { AIService } from '../../types/services/ai.service';
import {
  CSVFileEntity,
  CSVFileRepository,
  CSVFileRowRepository,
  UseCase,
} from '../../types';

export class GenerateCSVFileChartsUseCase
  implements UseCase<CSVFileEntity, Promise<void>>
{
  constructor(
    private csvFileRepository: CSVFileRepository,
    private csvFileRowRepository: CSVFileRowRepository,
    private aiService: AIService
  ) {}

  async execute(file: CSVFileEntity): Promise<void> {
    await this.csvFileRepository.setFileStateById(
      file._id,
      CSVFileState.ANALYZING
    );

    const rows = await this.csvFileRowRepository.getFileRowsById(file._id);
    const csvContent = json2csv(rows, {
      excludeKeys: ['_id', 'fileId', 'id'],
    });

    const charts = await this.aiService.generateCSVFileCharts(csvContent);
    await this.csvFileRepository.setFileCharts(file._id, charts);

    await this.csvFileRepository.setFileStateById(file._id, CSVFileState.DONE);
  }
}
