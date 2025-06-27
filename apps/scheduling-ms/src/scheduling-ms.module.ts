import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/config';
import { DatabaseModule } from './config/database/database.module';
import { options } from './config/message-broker/options';
import { CreateAppointmentUseCase } from './core/application/use-cases/create-appointment.use-case';
import { GetAppointmentsByCellphoneUseCase } from './core/application/use-cases/get-appointments-by-cellphone.use-case';
import { ReportRequestUseCase } from './core/application/use-cases/report-request.use-case';
import { Appointment } from './core/domain/entities/appointment/appointment.typeorm.entity';
import { PublisherAdapter } from './infrastructure/adapters/message-broker/publisher.adapter';
import { AppointmentsRepository } from './infrastructure/adapters/typeorm/appointments.typeorm.repository';
import { AppointmentsController } from './infrastructure/controllers/appointments.controller';
import { ReportsController } from './infrastructure/controllers/reports.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    DatabaseModule,
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    ConfigModule.forRoot({
      envFilePath: 'apps/scheduling-ms/.env',
      load: [config],
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'APPOINTMENT_SERVICE',
        transport: Transport.NATS,
        options,
      },
    ]),
  ],
  controllers: [AppointmentsController, ReportsController],
  providers: [
    ReportRequestUseCase,
    GetAppointmentsByCellphoneUseCase,
    CreateAppointmentUseCase,
    {
      provide: 'AppointmentRepositoryPort',
      useClass: AppointmentsRepository,
    },
    {
      provide: 'EventPublisherPort',
      useClass: PublisherAdapter,
    },
  ],
})
export class SchedulingMsModule {}
