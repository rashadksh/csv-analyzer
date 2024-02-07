import { GetAllCSVFilesUseCase } from '../../src/csv/usecases/get-all-csv-usecase';
import { CSVFileRepository } from '../../src/types';

describe('GetAllCSVFilesUseCase', () => {
  it('Should return all csv files', async () => {
    const files = [{ _id: 1 }, { _id: 2 }];
    const csvFileRepository: CSVFileRepository = {
      getAllFiles: jest.fn().mockReturnValue(files),
      getFileById: jest.fn().mockReturnValue(null),
      insertFile: jest.fn(),
      setFileCharts: jest.fn(),
      setFileHeaderById: jest.fn(),
      setFileStateById: jest.fn(),
    };

    const usecase = new GetAllCSVFilesUseCase(csvFileRepository);

    const returnFiles = await usecase.execute();
    expect(returnFiles).toEqual(files);
  });
});
