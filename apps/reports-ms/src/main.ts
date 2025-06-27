import { NestFactory } from '@nestjs/core';
import { ReportsMsModule } from './reports-ms.module';

async function bootstrap() {
  const app = await NestFactory.create(ReportsMsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
