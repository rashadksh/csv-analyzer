import { CreateCSVFileDTO } from '@csv-analyzer/types';

import {
  CSVFileRepository,
  CSVFileEntity,
  CSVFileEntityState,
  UseCase,
  CSVAnalyzerQueueProducer,
} from '../../types';

export class CreateCSVUseCase
  implements UseCase<CreateCSVFileDTO, Promise<CSVFileEntity>>
{
  constructor(
    private fileRepository: CSVFileRepository,
    private parsingQueueProducer: CSVAnalyzerQueueProducer
  ) {}

  async execute(input: CreateCSVFileDTO): Promise<CSVFileEntity> {
    const fileEntity = await this.fileRepository.insertFile({
      name: input.name,
      path: input.path,
      state: CSVFileEntityState.UPLOADED,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.parsingQueueProducer.addJob({ id: fileEntity._id.toString() });

    return fileEntity;
  }
}
