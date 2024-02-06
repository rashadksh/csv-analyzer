import { CSVAnalyzerError } from '.';

export class CSVFileNotFoundError extends CSVAnalyzerError {
  constructor() {
    super(`CSV file not found`);
  }
}
