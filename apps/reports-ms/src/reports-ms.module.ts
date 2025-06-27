import { Module } from '@nestjs/common';
import { ReportsMsController } from './reports-ms.controller';
import { ReportsMsService } from './reports-ms.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import Joi from 'joi';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: 'apps/scheduling-ms/.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_DB: Joi.string().required(),
        MS_DIR: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required().positive(),
        TYPEORM_CONNECTION: Joi.string().required(),
        TYPEORM_ENTITIES: Joi.string().required(),
        TYPEORM_MIGRATIONS: Joi.string().required(),
        TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
        TYPEORM_MIGRATIONS_TABLE_NAME: Joi.string().required(),
        SHOW_DATABASE_LOGS: Joi.string().required(),
      }),
    }),
  ],
  controllers: [ReportsMsController],
  providers: [ReportsMsService],
})
export class ReportsMsModule {}
