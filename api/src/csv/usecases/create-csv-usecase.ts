import { CreateCSVFileDTO } from '@csv-analyzer/types';

import {
  CSVFileRepository,
  CSVFileEntity,
  CSVFileEntityState,
  UseCase,
  QueueProducer,
} from '../../types';

export class CreateCSVUseCase
  implements UseCase<CreateCSVFileDTO, Promise<CSVFileEntity>>
{
  constructor(
    private fileRepository: CSVFileRepository,
    private parsingQueueProducer: QueueProducer
  ) {}

  async execute(input: CreateCSVFileDTO): Promise<CSVFileEntity> {
    const fileEntity = await this.fileRepository.insertFile({
      name: input.name,
      path: input.path,
      state: CSVFileEntityState.UPLOADED,
      charts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.parsingQueueProducer.addJob({ id: fileEntity._id.toString() });

    return fileEntity;
  }
}
