import * as path from 'path';
import { DataSource } from 'typeorm';
import config from './config';
import { Credentials } from './database/credentials';

require('module-alias/register');

const cfg = config();

export default new DataSource({
  type: 'postgres',
  host: Credentials.host,
  port: Credentials.port,
  username: Credentials.username,
  password: Credentials.password,
  database: Credentials.database,
  synchronize: false,
  entities: [path.join(cfg.msDir, cfg.database.entities)],
  migrations: [path.join(cfg.msDir, cfg.database.migrations)],
  logging: true,
});
