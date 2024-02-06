import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CSVAnalyzerError } from '.';
import { CSVFileNotFoundError } from './csv-errors';

export abstract class CSVAnalyzerHTTPError {
  static throwHttpErrorFromIWillError(error: CSVAnalyzerError) {
    if (error instanceof CSVFileNotFoundError) {
      throw new NotFoundException();
    }

    throw new InternalServerErrorException();
  }
}
