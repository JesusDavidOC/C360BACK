import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { options } from './config/message-broker/options';
import { ReportsMsModule } from './reports-ms.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ReportsMsModule, {
    transport: Transport.NATS,
    options,
  });
  await app.listen();
  console.log('Reports Microservice is running');
}
bootstrap();
