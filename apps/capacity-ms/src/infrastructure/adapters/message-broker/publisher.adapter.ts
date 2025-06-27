import { TechnicianAssignedEvent } from '@c360/shared-kernel/events/technician-assigned.event';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventPublisherPort } from '../../../core/domain/ports/outbound/event-publisher.port';

@Injectable()
export class PublisherAdapter implements EventPublisherPort, OnModuleInit {
  constructor(
    @Inject('APPOINTMENT_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  async publishTechnicianAssigned(event: TechnicianAssignedEvent): Promise<void> {
    this.client.emit(event.getSubject(), {
      appointment: event.appointment,
      technician: event.technician,
    });
  }
}
