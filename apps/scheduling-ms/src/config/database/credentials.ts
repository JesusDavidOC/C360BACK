import * as dotenv from 'dotenv';
import config from '../config';

dotenv.config();

const cfg = config().database;

export const Credentials = {
  type: cfg.conection,
  host: cfg.host,
  port: cfg.port,
  username: cfg.username,
  password: cfg.password,
  database: cfg.name,
};
