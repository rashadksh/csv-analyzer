import { json2csv } from 'json-2-csv';

import { AskCSVUseCase } from '../../src/csv/usecases/ask-csv-usecase';
import { CSVFileRowRepository } from '../../src/types';
import { AIService } from '../../src/types/services/ai.service';

describe('AskCSVFileUseCase', () => {
  it('Should return empty when no rows found', async () => {
    const csvFileRowsRepository: CSVFileRowRepository = {
      getFileRowsById: jest.fn().mockReturnValue([]),
      insertFileRows: jest.fn(),
    };

    const aiService: AIService = {
      askCSVFile: jest.fn(),
      generateCSVFileCharts: jest.fn(),
    };

    const usecase = new AskCSVUseCase(csvFileRowsRepository, aiService);
    const answer = await usecase.execute({
      fileId: '1',
      question: 'test',
    });

    expect(answer).toEqual('');
    expect(csvFileRowsRepository.getFileRowsById).toHaveBeenCalledTimes(1);
    expect(aiService.askCSVFile).not.toHaveBeenCalled();
  });

  it('Should return answer to question', async () => {
    const rows = [
      { _id: 1, fileId: 1, name: 'rashad' },
      { _id: 2, fileId: 1, name: 'moahmed' },
    ];
    const csvFileRowsRepository: CSVFileRowRepository = {
      getFileRowsById: jest.fn().mockReturnValue(rows),
      insertFileRows: jest.fn(),
    };

    const aiService: AIService = {
      askCSVFile: jest.fn().mockReturnValue('answer'),
      generateCSVFileCharts: jest.fn(),
    };

    const usecase = new AskCSVUseCase(csvFileRowsRepository, aiService);
    const answer = await usecase.execute({
      fileId: '1',
      question: 'test',
    });

    const csvContent = json2csv(rows, {
      excludeKeys: ['_id', 'fileId', 'id'],
    });

    expect(answer).toEqual('answer');
    expect(csvFileRowsRepository.getFileRowsById).toHaveBeenCalledTimes(1);
    expect(aiService.askCSVFile).toHaveBeenCalledWith(csvContent, 'test');
  });
});
