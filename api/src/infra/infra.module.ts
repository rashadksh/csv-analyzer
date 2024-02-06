import { Global, Module } from '@nestjs/common';
import { ConfigService as NestConfignService } from '@nestjs/config';

import { dbFactory } from './db.provider';
import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [],
  providers: [NestConfignService, ConfigService, dbFactory],
  exports: [dbFactory, ConfigService],
})
export class InfraModule {}
