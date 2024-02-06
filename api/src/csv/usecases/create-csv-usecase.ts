import { CreateCSVFileDTO } from '@csv-analyzer/types';

import {
  CSVRepository,
  FileEntity,
  FileEntityState,
  UseCase,
  CSVAnalyzerQueue,
} from '../../types';

export class CreateCSVUseCase
  implements UseCase<CreateCSVFileDTO, Promise<FileEntity>>
{
  constructor(
    private fileRepository: CSVRepository,
    private parsingQueue: CSVAnalyzerQueue
  ) {}

  async execute(input: CreateCSVFileDTO): Promise<FileEntity> {
    const fileEntity = await this.fileRepository.insertFile({
      name: input.name,
      path: input.path,
      state: FileEntityState.UPLOADED,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.parsingQueue.addJob({ id: fileEntity._id.toString() });

    return fileEntity;
  }
}
