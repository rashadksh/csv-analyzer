import { json2csv } from 'json-2-csv';

import { AskCSVFileDTO } from '@csv-analyzer/types';

import { CSVFileRowRepository, UseCase } from '../../types';
import { AIService } from '../../types/services/ai.service';

export class AskCSVUseCase
  implements UseCase<AskCSVFileDTO & { fileId: string }, Promise<string>>
{
  constructor(
    private csvFileRowsRepository: CSVFileRowRepository,
    private aiService: AIService
  ) {}

  async execute(input: AskCSVFileDTO & { fileId: string }): Promise<string> {
    const fileContent = await this.csvFileRowsRepository.getFileRowsById(
      input.fileId
    );

    if (fileContent.length <= 0) {
      return '';
    }

    const csvContent = json2csv(fileContent, {
      excludeKeys: ['_id', 'fileId', 'id'],
    });

    return this.aiService.askCSVFile(csvContent, input.question);
  }
}
