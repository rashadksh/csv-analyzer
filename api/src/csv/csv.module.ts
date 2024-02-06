import { Module } from '@nestjs/common';

import { InfraModule } from '../infra/infra.module';

import { CSVController } from './csv.controller';
import { CSVService } from './csv.service';
import { MongoCSVRepository } from './csv.repository';

@Module({
  imports: [InfraModule],
  controllers: [CSVController],
  providers: [CSVService, MongoCSVRepository],
})
export class CSVModule {}
