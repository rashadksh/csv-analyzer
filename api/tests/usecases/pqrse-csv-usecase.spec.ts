import path from 'path';
import fs from 'fs';
import { json2csv } from 'json-2-csv';
import { ParseCSVFileUseCase } from '../../src/csv/usecases/parse-csv-usecase';
import {
  CSVFileRepository,
  CSVFileRowRepository,
  QueueProducer,
} from '../../src/types';
import { CSVFileNotFoundError } from '../../src/lib/errors/csv-errors';

describe('ParseCSVFileUseCase', () => {
  const fileName = `${Math.random().toString(16).slice(2)}.csv`;
  const filePath = path.join(__dirname, fileName);

  const jsonData = [
    { name: 'Rashad', age: '27' },
    { name: 'Mohamed', age: '40' },
    { name: 'Omar', age: '35' },
  ];

  const csvData = json2csv(jsonData);

  beforeEach(() => {
    fs.writeFileSync(filePath, csvData);
  });

  afterEach(() => {
    fs.unlinkSync(filePath);
  });

  it('Should throw error when file not found', async () => {
    const id = '1234';
    const csvFileRepository: CSVFileRepository = {
      getAllFiles: jest.fn(),
      getFileById: jest.fn(),
      insertFile: jest.fn().mockReturnValue({ _id: id }),
      setFileCharts: jest.fn(),
      setFileHeaderById: jest.fn(),
      setFileStateById: jest.fn(),
    };

    const csvFileRowsRepository: CSVFileRowRepository = {
      getFileRowsById: jest.fn().mockReturnValue([]),
      insertFileRows: jest.fn(),
    };

    const parsingQueueProducer: QueueProducer = {
      addJob: jest.fn(),
    };

    const usecase = new ParseCSVFileUseCase(
      csvFileRepository,
      csvFileRowsRepository,
      parsingQueueProducer
    );
    try {
      await usecase.execute(id);
      // to make sure catch is called
      expect(1).toEqual(0);
    } catch (e) {
      expect(e).toBeInstanceOf(CSVFileNotFoundError);
    }
  });

  it('Should parse csv file', async () => {
    const file = { _id: '1234', path: filePath };
    const csvFileRepository: CSVFileRepository = {
      getAllFiles: jest.fn(),
      getFileById: jest.fn().mockReturnValue(file),
      insertFile: jest.fn(),
      setFileCharts: jest.fn(),
      setFileHeaderById: jest.fn(),
      setFileStateById: jest.fn(),
    };

    const csvFileRowsRepository: CSVFileRowRepository = {
      getFileRowsById: jest.fn().mockReturnValue([]),
      insertFileRows: jest.fn(),
    };

    const analyzingQueueProducer: QueueProducer = {
      addJob: jest.fn(),
    };

    const usecase = new ParseCSVFileUseCase(
      csvFileRepository,
      csvFileRowsRepository,
      analyzingQueueProducer
    );
    await usecase.execute(file._id);

    expect(csvFileRepository.setFileStateById).toHaveBeenCalledWith(
      file._id,
      'parsing'
    );
    expect(csvFileRepository.setFileHeaderById).toHaveBeenCalledWith(file._id, [
      'name',
      'age',
    ]);
    expect(csvFileRowsRepository.insertFileRows).toHaveBeenCalledWith(
      file._id,
      jsonData
    );
    expect(csvFileRepository.setFileStateById).toHaveBeenCalledWith(
      file._id,
      'done_parsing'
    );
    expect(analyzingQueueProducer.addJob).toHaveBeenCalledWith({
      id: file._id,
    });
  });
});
