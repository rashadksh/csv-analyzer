import { GetCSVFileUseCase } from '../../src/csv/usecases/get-csv-usecase';
import { CSVFileNotFoundError } from '../../src/lib/errors/csv-errors';
import { CSVFileRepository, CSVFileRowRepository } from '../../src/types';

describe('GetCSVFileUseCase', () => {
  it('Should throw error when file not found', async () => {
    const id = '123243';
    const csvFileRepository: CSVFileRepository = {
      getAllFiles: jest.fn(),
      getFileById: jest.fn().mockReturnValue(null),
      insertFile: jest.fn(),
      setFileCharts: jest.fn(),
      setFileHeaderById: jest.fn(),
      setFileStateById: jest.fn(),
    };

    const csvFileRowsRepository: CSVFileRowRepository = {
      getFileRowsById: jest.fn().mockReturnValue([]),
      insertFileRows: jest.fn(),
    };

    const usecase = new GetCSVFileUseCase(
      csvFileRepository,
      csvFileRowsRepository
    );

    try {
      await usecase.execute(id);
      // to make sure catch is called
      expect(1).toEqual(0);
    } catch (e) {
      expect(e).toBeInstanceOf(CSVFileNotFoundError);
    }
  });

  it('Should get csv file with its rows', async () => {
    const id = '123243';
    const csvFileRepository: CSVFileRepository = {
      getAllFiles: jest.fn(),
      getFileById: jest.fn().mockReturnValue({ _id: id }),
      insertFile: jest.fn(),
      setFileCharts: jest.fn(),
      setFileHeaderById: jest.fn(),
      setFileStateById: jest.fn(),
    };

    const rows = [
      { _id: 1, fileId: 1, name: 'rashad' },
      { _id: 2, fileId: 1, name: 'moahmed' },
    ];
    const csvFileRowsRepository: CSVFileRowRepository = {
      getFileRowsById: jest.fn().mockReturnValue(rows),
      insertFileRows: jest.fn(),
    };

    const usecase = new GetCSVFileUseCase(
      csvFileRepository,
      csvFileRowsRepository
    );

    const { file: returnFile, rows: returnRows } = await usecase.execute(id);

    expect(returnFile._id).toEqual(id);
    expect(returnRows).toEqual(rows);
  });
});
