import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default registerAs('config', () => ({
  showDatabaseLogs: process.env.SHOW_DATABASE_LOGS === 'true',
  nodeEnv: process.env.NODE_ENV,
  msDir: process.env.MS_DIR,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    conection: process.env.TYPEORM_CONNECTION,
    entities: process.env.TYPEORM_ENTITIES,
    migrations: process.env.TYPEORM_MIGRATIONS,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    logging: process.env.TYPEORM_LOGGING,
  },
  nats: {
    url: process.env.NATS_URL || 'nats://localhost:4222',
    queue: process.env.NATS_QUEUE || 'appointments',
  },
}));
