import { CreateCSVFileDTO } from '@csv-analyzer/types';

import {
  CSVRepository,
  FileEntity,
  FileEntityState,
  UseCase,
} from '../../types';

export class CreateCSVUseCase
  implements UseCase<CreateCSVFileDTO, Promise<FileEntity>>
{
  constructor(private fileRepository: CSVRepository) {}

  execute(input: CreateCSVFileDTO): Promise<FileEntity> {
    return this.fileRepository.insertFile({
      name: input.name,
      path: input.path,
      state: FileEntityState.UPLOADED,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
