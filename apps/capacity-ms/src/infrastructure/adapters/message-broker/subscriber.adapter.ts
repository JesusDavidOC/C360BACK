import { Injectable } from '@c360/shared-kernel/dependency-manager/decorators/injectable.decorator';
import { AppointmentCreatedEvent } from '@c360/shared-kernel/events/appointment-created.event';
import { APPOINTMENT_CREATED_SUBJECT } from '@c360/shared-kernel/events/consts/appointment-created-subject.const';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { EventSubscriberPort } from 'apps/capacity-ms/src/core/domain/ports/outbound/event-subscriber.port';
import { CreateAppointmentCommand } from '../../../core/application/commands/create-appointment.command';
import { CreateAppointmentUseCase } from '../../../core/application/use-cases/create-appointment.use-case';

@Injectable()
export class SubscriberAdapter implements EventSubscriberPort, OnModuleInit {
  constructor(
    @Inject('APPOINTMENT_SERVICE')
    private readonly client: ClientProxy,

    @Inject(CreateAppointmentUseCase)
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  @EventPattern(APPOINTMENT_CREATED_SUBJECT)
  async handleAppointmentCreated(data: AppointmentCreatedEvent) {
    const event: CreateAppointmentCommand = {
      date: data.date,
      serviceType: data.serviceType,
    };
    await this.createAppointmentUseCase.execute(event);
  }
}
