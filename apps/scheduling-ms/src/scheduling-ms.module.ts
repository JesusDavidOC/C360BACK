import { CAPACITY_NATS_SERIVE_NAME } from '@c360/shared-kernel/consts/capacity-nats-service-name.const';
import { SCHEDULING_NATS_SERIVE_NAME } from '@c360/shared-kernel/consts/scheduling-nats-service-name.const';
import { messageBrokerOptionsFactory } from '@c360/shared-kernel/factories/message-broker/options.factory';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { SubscriberAdapter } from './infrastructure/adapters/message-broker/subscriber.adapter';
import { AppointmentsRepository } from './infrastructure/adapters/typeorm/appointments.typeorm.repository';

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
        name: SCHEDULING_NATS_SERIVE_NAME,
        transport: Transport.NATS,
        options,
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: CAPACITY_NATS_SERIVE_NAME,
        imports: [ConfigModule],
        useFactory: (cs: ConfigService) =>
          messageBrokerOptionsFactory(cs, CAPACITY_NATS_SERIVE_NAME),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [SubscriberAdapter],
  providers: [
    ReportRequestUseCase,
    GetAppointmentsByCellphoneUseCase,
    CreateAppointmentUseCase,
    SubscriberAdapter,
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
