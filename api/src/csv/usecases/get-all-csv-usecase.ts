import { CSVFileEntity, CSVFileRepository, UseCase } from '../../types';

export class GetAllCSVFilesUseCase
  implements UseCase<void, Promise<CSVFileEntity[]>>
{
  constructor(private csvFileRepository: CSVFileRepository) {}

  execute(): Promise<CSVFileEntity[]> {
    return this.csvFileRepository.getAllFiles();
  }
}
