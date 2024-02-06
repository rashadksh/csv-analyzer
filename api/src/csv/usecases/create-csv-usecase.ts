import { CreateCSVFileDTO } from '@csv-analyzer/types';

import {
  CSVRepository,
  CSVFileEntity,
  CSVFileEntityState,
  UseCase,
  CSVAnalyzerQueue,
} from '../../types';

export class CreateCSVUseCase
  implements UseCase<CreateCSVFileDTO, Promise<CSVFileEntity>>
{
  constructor(
    private fileRepository: CSVRepository,
    private parsingQueue: CSVAnalyzerQueue
  ) {}

  async execute(input: CreateCSVFileDTO): Promise<CSVFileEntity> {
    const fileEntity = await this.fileRepository.insertFile({
      name: input.name,
      path: input.path,
      state: CSVFileEntityState.UPLOADED,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.parsingQueue.addJob({ id: fileEntity._id.toString() });

    return fileEntity;
  }
}
