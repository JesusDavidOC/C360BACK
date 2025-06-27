import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CapacityMsModule } from './capacity-ms.module';
import { options } from './config/message-broker/options';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CapacityMsModule, {
    transport: Transport.NATS,
    options,
  });
  await app.listen();
}
bootstrap();
