import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default registerAs('config', () => ({
  nodeEnv: process.env.NODE_ENV,
  projectPort: process.env.PROJECT_PORT || 3000,
  msDir: process.env.MS_DIR,
  nats: {
    url: process.env.NATS_URL || 'nats://localhost:4222',
    queue: process.env.NATS_QUEUE || 'appointments',
  },
}));
