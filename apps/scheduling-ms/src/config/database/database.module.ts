import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Credentials } from './credentials';

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: Credentials.host,
        port: Credentials.port,
        username: Credentials.username,
        password: Credentials.password,
        database: Credentials.database,
        autoLoadEntities: true,
        synchronize: false,
        logging:
          configService.get('SHOW_DATABASE_LOGS') === 'true' ? ['query', 'error'] : ['error'],
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
