import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { options } from './config/message-broker/options';
import { SchedulingMsModule } from './scheduling-ms.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SchedulingMsModule, {
    transport: Transport.NATS,
    options,
  });
  await app.listen();
  console.log('Scheduling-MS listening via NATS');
}
bootstrap();
