import { Global, Module } from '@nestjs/common';
import { ConfigService as NestConfignService } from '@nestjs/config';

import { dbFactory } from './db.provider';
import { ConfigService } from './config.service';
import { OpenAIService } from './openai.service';

@Global()
@Module({
  imports: [],
  providers: [NestConfignService, ConfigService, dbFactory, OpenAIService],
  exports: [dbFactory, ConfigService, OpenAIService],
})
export class InfraModule {}
