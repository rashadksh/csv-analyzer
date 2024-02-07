import { CreateCSVUseCase } from '../../src/csv/usecases/create-csv-usecase';
import { CSVFileRepository, QueueProducer } from '../../src/types';

describe('CreateCSVUseCase', () => {
  it('Should create new file entity', async () => {
    const id = '1234';
    const csvFileRepository: CSVFileRepository = {
      getAllFiles: jest.fn(),
      getFileById: jest.fn(),
      insertFile: jest.fn().mockReturnValue({ _id: id }),
      setFileCharts: jest.fn(),
      setFileHeaderById: jest.fn(),
      setFileStateById: jest.fn(),
    };

    const parsingQueueProducer: QueueProducer = {
      addJob: jest.fn(),
    };

    const usecase = new CreateCSVUseCase(
      csvFileRepository,
      parsingQueueProducer
    );
    const file = await usecase.execute({
      name: 'test',
      path: 'test.csv',
    });

    expect(csvFileRepository.insertFile).toHaveBeenCalled();
    expect(parsingQueueProducer.addJob).toHaveBeenCalledWith({ id });
    expect(file._id).toEqual(id);
  });
});
