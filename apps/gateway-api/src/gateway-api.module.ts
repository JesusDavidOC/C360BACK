import { CAPACITY_NATS_SERIVE_NAME } from '@c360/shared-kernel/consts/capacity-nats-service-name.const';
import { SCHEDULING_NATS_SERIVE_NAME } from '@c360/shared-kernel/consts/scheduling-nats-service-name.const';
import { messageBrokerOptionsFactory } from '@c360/shared-kernel/factories/message-broker/options.factory';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import config from './config/config';
import { CreateAppointmentUseCase } from './core/application/use-cases/create-appointment.use-case';
import { AppointmentsController } from './infrastructure/controllers/appointments.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: `${config().msDir}.env`,
    }),
    ClientsModule.registerAsync([
      {
        name: SCHEDULING_NATS_SERIVE_NAME,
        imports: [ConfigModule],
        useFactory: (cs: ConfigService) =>
          messageBrokerOptionsFactory(cs, SCHEDULING_NATS_SERIVE_NAME),
        inject: [ConfigService],
      },
      {
        name: CAPACITY_NATS_SERIVE_NAME,
        imports: [ConfigModule],
        useFactory: (cs: ConfigService) =>
          messageBrokerOptionsFactory(cs, CAPACITY_NATS_SERIVE_NAME),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [CreateAppointmentUseCase],
})
export class GatewayApiModule {}
