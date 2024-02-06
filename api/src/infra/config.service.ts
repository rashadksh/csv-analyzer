import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfignService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfignService) {}

  getMongodbConnectionString(): string {
    return this.configService.get('MONGODB_URL');
  }

  getMongodbDabaseName(): string {
    return this.configService.get('MONGODB_DATABASE');
  }
}
