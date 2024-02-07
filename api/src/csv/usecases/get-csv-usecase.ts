import { CSVFileNotFoundError } from '../../lib/errors/csv-errors';
import {
  CSVFileEntity,
  CSVFileRepository,
  CSVFileRowEntity,
  CSVFileRowRepository,
  UseCase,
} from '../../types';

export class GetCSVFileUseCase
  implements
    UseCase<
      string,
      Promise<{
        file: CSVFileEntity;
        rows: CSVFileRowEntity[];
      }>
    >
{
  constructor(
    private csvFileRepository: CSVFileRepository,
    private csvFileRowsRepository: CSVFileRowRepository
  ) {}

  async execute(id: string): Promise<{
    file: CSVFileEntity;
    rows: CSVFileRowEntity[];
  }> {
    const file = await this.csvFileRepository.getFileById(id);
    if (!file) {
      throw new CSVFileNotFoundError();
    }

    const rows = await this.csvFileRowsRepository.getFileRowsById(file._id);

    return {
      file,
      rows,
    };
  }
}
