import { Module } from '@nestjs/common';

import { CAPACITY_NATS_SERIVE_NAME } from '@c360/shared-kernel/consts/capacity-nats-service-name.const';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/config';
import { DatabaseModule } from './config/database/database.module';
import { options } from './config/message-broker/options';
import { CreateAppointmentUseCase } from './core/application/use-cases/create-appointment.use-case';
import { GetAvailableTechnicianUseCase } from './core/application/use-cases/get-available-technician.use-case';
import { ValidateCapacityUseCase } from './core/application/use-cases/validate-capacity.use-case';
import { AppointmentCapacity } from './core/domain/entities/appointment/appointment.typeorm.entity';
import { Technician } from './core/domain/entities/technician/technician.typeorm.entity';
import { PublisherAdapter } from './infrastructure/adapters/message-broker/publisher.adapter';
import { SubscriberAdapter } from './infrastructure/adapters/message-broker/subscriber.adapter';
import { CapacityRepository } from './infrastructure/adapters/typeorm/capacity.typeorm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentCapacity, Technician]),
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: 'apps/scheduling-ms/.env',
      load: [config],
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: CAPACITY_NATS_SERIVE_NAME,
        transport: Transport.NATS,
        options,
      },
    ]),
  ],
  controllers: [SubscriberAdapter],
  providers: [
    SubscriberAdapter,
    CreateAppointmentUseCase,
    GetAvailableTechnicianUseCase,
    ValidateCapacityUseCase,
    {
      provide: 'CapacityRepositoryPort',
      useClass: CapacityRepository,
    },
    {
      provide: 'ValidateCapacityPort',
      useClass: CapacityRepository,
    },
    {
      provide: 'EventPublisherPort',
      useClass: PublisherAdapter,
    },
  ],
  exports: [],
})
export class CapacityMsModule {}
