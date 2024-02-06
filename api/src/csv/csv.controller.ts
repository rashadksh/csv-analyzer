import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { CreateCSVFileDTO } from '@csv-analyzer/types';

import { FILE_UPLOAD_DESTINATION } from '../constants';
import { convertFileNameToTitle } from '../lib/utils';
import { CSVAnalyzerHTTPError } from '../lib/errors/csv-analyzer-http-errors';

import { CSVService } from './csv.service';
import { CSVFileMapper } from './csv.mapper';

const MAX_FILE_SIZE_BYTES = 1000 * 1024; // 1MB

@Controller('csv')
export class CSVController {
  constructor(private csvService: CSVService) {}

  @Post('process')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: FILE_UPLOAD_DESTINATION,
        filename: (_req, _file, cb) => cb(null, `${uuid()}.csv`),
      }),
    })
  )
  async processCSVFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'csv',
        })
        .addMaxSizeValidator({
          maxSize: MAX_FILE_SIZE_BYTES,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: true,
        })
    )
    file: any
  ) {
    try {
      const dto: CreateCSVFileDTO = {
        name: convertFileNameToTitle(file.originalname),
        path: file.path,
      };
      const fileEntity = await this.csvService.createFile(dto);
      return CSVFileMapper.dbToJSON(fileEntity);
    } catch (e) {
      Logger.error(`Failed uploading file - ${e}`);
      CSVAnalyzerHTTPError.throwHttpErrorFromIWillError(e);
    }
  }
}
