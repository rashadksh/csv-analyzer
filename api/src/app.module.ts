import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { InfraModule } from './infra/infra.module';
import { CSVModule } from './csv/csv.module';
import { ConfigService } from './infra/config.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          redis: {
            host: configService.getRedisHost(),
            port: configService.getRedisPort(),
          },
          defaultJobOptions: {
            attempts: 3,
            removeOnComplete: true,
          },
        };
      },
    }),
    InfraModule,
    CSVModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
