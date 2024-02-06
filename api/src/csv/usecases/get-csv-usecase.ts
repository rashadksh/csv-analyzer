import { CSVFileEntity, CSVFileRepository, UseCase } from '../../types';

export class GetCSVFileUseCase
  implements UseCase<string, Promise<CSVFileEntity>>
{
  constructor(private csvFileRepository: CSVFileRepository) {}

  execute(id: string): Promise<CSVFileEntity> {
    return this.csvFileRepository.getFileById(id);
  }
}
