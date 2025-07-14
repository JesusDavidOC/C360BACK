import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import config from '../config';

export const options: MicroserviceOptions = {
  transport: Transport.NATS,
  options: {
    url: config().nats.url || 'nats://localhost:4222',
    queue: 'reports',
  },
};
