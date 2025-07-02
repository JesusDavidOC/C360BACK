// apps/api-gateway/src/config/message-broker.factory.ts
import { ConfigService } from '@nestjs/config';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export function messageBrokerOptionsFactory(
  cs: ConfigService,
  name: string,
): ClientProviderOptions {
  return {
    transport: Transport.NATS,
    name,
    options: {
      // tu URL y cola de NATS
      servers: [cs.get<string>('config.nats.url')],
      queue: cs.get<string>('config.nats.queue'),
    },
  };
}
