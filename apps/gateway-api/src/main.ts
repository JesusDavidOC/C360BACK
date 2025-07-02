import { NestFactory } from '@nestjs/core';
import config from './config/config';
import { GatewayApiModule } from './gateway-api.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayApiModule);
  await app.listen(config().projectPort ?? 3000);
}
bootstrap();
