import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { AppointmentCreatedEvent } from '@c360/shared-kernel/events/appointment-created.event';
import { ReportRequestEvent } from '@c360/shared-kernel/events/report-request.event';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventPublisherPort } from 'apps/scheduling-ms/src/core/domain/ports/outbound/event-publisher.port';

@Injectable()
export class PublisherAdapter implements EventPublisherPort, OnModuleInit {
  constructor(
    @Inject('APPOINTMENT_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  async publishAppointmentCreated(appointment: {
    id: string;
    cellphone: string;
    date: Date;
    serviceType: ServiceType;
    createdAt: Date;
  }): Promise<void> {
    const { id, cellphone, date, serviceType, createdAt } = appointment;
    const appointmentCreatedEvent = new AppointmentCreatedEvent(
      id,
      cellphone,
      date,
      serviceType,
      createdAt,
    );
    this.client.emit<AppointmentCreatedEvent>(appointmentCreatedEvent.getSubject(), {
      ...appointment,
    });
  }

  async publishRequestReport(reportRequest: ReportRequestEvent): Promise<void> {
    this.client.emit<ReportRequestEvent>(reportRequest.getSubject(), { reportRequest });
  }
}
