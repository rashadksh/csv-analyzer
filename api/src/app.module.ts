import { Module } from '@nestjs/common';

import { InfraModule } from './infra/infra.module';
import { CSVModule } from './csv/csv.module';

@Module({
  imports: [InfraModule, CSVModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
