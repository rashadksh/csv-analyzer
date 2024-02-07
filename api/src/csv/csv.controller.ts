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
  Get,
  Param,
  Body,
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

  @Get('/')
  async getAllCSVFiles() {
    try {
      const fileEntities = await this.csvService.getAllCSVFiles();
      return CSVFileMapper.dbToJSONBulk(fileEntities);
    } catch (e) {
      Logger.error(`Failed getting csv file by id - ${e}`);
      CSVAnalyzerHTTPError.throwHttpErrorFromIWillError(e);
    }
  }

  @Post('/')
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

  @Get('/:id')
  async getCSVFile(@Param('id') id: string) {
    try {
      const { file, rows } = await this.csvService.getFileById(id);
      const mappedFile = CSVFileMapper.dbToJSON(file);
      return {
        file: mappedFile,
        rows,
      };
    } catch (e) {
      Logger.error(`Failed getting csv file of id ${id} - ${e}`);
      CSVAnalyzerHTTPError.throwHttpErrorFromIWillError(e);
    }
  }

  @Post('/:id/ask')
  async askCSVFile(
    @Param('id') id: string,
    @Body('question') question: string
  ) {
    try {
      const answer = await this.csvService.talkToCSVFileById(id, question);
      return {
        answer,
      };
    } catch (e) {
      Logger.error(`Failed asking csv file of id ${id} - ${e}`);
      CSVAnalyzerHTTPError.throwHttpErrorFromIWillError(e);
    }
  }
}
