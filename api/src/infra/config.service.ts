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

  getRedisHost(): string {
    return this.configService.get('REDIS_HOST');
  }

  getRedisPort(): number {
    return this.configService.get('REDIS_PORT');
  }
}
