import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '../config/config';
import { GatewayApiController } from './gateway-api.controller';
import { GatewayApiService } from './gateway-api.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: 'apps/api-gateway/.env',
    }),
  ],
  controllers: [GatewayApiController],
  providers: [GatewayApiService],
})
export class GatewayApiModule {}
