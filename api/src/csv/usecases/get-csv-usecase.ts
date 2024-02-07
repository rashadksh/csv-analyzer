import { CSVFileNotFoundError } from '../../lib/errors/csv-errors';
import { CSVFileEntity, CSVFileRepository, UseCase } from '../../types';

export class GetCSVFileUseCase
  implements UseCase<string, Promise<CSVFileEntity>>
{
  constructor(private csvFileRepository: CSVFileRepository) {}

  async execute(id: string): Promise<CSVFileEntity> {
    const file = await this.csvFileRepository.getFileById(id);
    if (!file) {
      throw new CSVFileNotFoundError();
    }

    return file;
  }
}
