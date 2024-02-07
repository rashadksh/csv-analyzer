import { json2csv } from 'json-2-csv';
import { GenerateCSVFileChartsUseCase } from '../../src/csv/usecases/generate-csv-charts.usecase';
import { CSVFileNotFoundError } from '../../src/lib/errors/csv-errors';
import { CSVFileRepository, CSVFileRowRepository } from '../../src/types';
import { AIService } from '../../src/types/services/ai.service';

describe('GenerateCSVFileChartsUseCase', () => {
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

    const aiService: AIService = {
      askCSVFile: jest.fn(),
      generateCSVFileCharts: jest.fn(),
    };

    const usecase = new GenerateCSVFileChartsUseCase(
      csvFileRepository,
      csvFileRowsRepository,
      aiService
    );

    try {
      await usecase.execute(id);
      // to make sure catch is called
      expect(1).toEqual(0);
    } catch (e) {
      expect(e).toBeInstanceOf(CSVFileNotFoundError);
    }
  });

  it('Should generate charts for csv file', async () => {
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

    const charts = [{ type: 'pie' }];
    const aiService: AIService = {
      askCSVFile: jest.fn(),
      generateCSVFileCharts: jest.fn().mockReturnValue(charts),
    };

    const usecase = new GenerateCSVFileChartsUseCase(
      csvFileRepository,
      csvFileRowsRepository,
      aiService
    );

    await usecase.execute(id);

    const csvContent = json2csv(rows, {
      excludeKeys: ['_id', 'fileId', 'id'],
    });

    expect(csvFileRepository.setFileStateById).toHaveBeenCalledWith(
      id,
      'analyzing'
    );
    expect(aiService.generateCSVFileCharts).toHaveBeenCalledWith(csvContent);
    expect(csvFileRepository.setFileCharts).toHaveBeenCalledWith(id, charts);
    expect(csvFileRepository.setFileStateById).toHaveBeenCalledWith(id, 'done');
  });
});
