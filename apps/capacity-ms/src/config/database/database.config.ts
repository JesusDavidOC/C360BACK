import { registerAs } from '@nestjs/config';
import config from '../config';

const cfg = config().database;

export default registerAs('database', () => ({
  type: 'postgres',
  host: cfg.host,
  port: cfg.port,
  username: cfg.username,
  password: cfg.password,
  name: cfg.name,
}));
