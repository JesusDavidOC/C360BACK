import { REPORTS_NATS_SERIVE_NAME } from '@c360/shared-kernel/consts/reports-nats-service-name.const';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/config';
import { DatabaseModule } from './config/database/database.module';
import { options } from './config/message-broker/options';
import { CreateAppointmentUseCase } from './core/application/use-cases/create-appointment.use-case';
import { TechnicianAssignUseCase } from './core/application/use-cases/technician-assign.use-case';
import { AppointmentReport } from './core/domain/entities/appointments-report/appointment.typeorm.entity';
import { Report } from './core/domain/entities/report/report.typeorm.entity';
import { SubscriberAdapter } from './infrastructure/adapters/message-broker/subscriber.adapter';
import { ReportsRepository } from './infrastructure/adapters/typeorm/reports.typeorm.repository';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([AppointmentReport, Report]),
    ConfigModule.forRoot({
      envFilePath: 'apps/scheduling-ms/.env',
      load: [config],
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: REPORTS_NATS_SERIVE_NAME,
        transport: Transport.NATS,
        options,
      },
    ]),
  ],
  controllers: [SubscriberAdapter],
  providers: [
    CreateAppointmentUseCase,
    TechnicianAssignUseCase,
    {
      provide: 'ReportsRepositoryPort',
      useClass: ReportsRepository,
    },
  ],
})
export class ReportsMsModule {}
