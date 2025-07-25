import { SCHEDULING_NATS_SERIVE_NAME } from '@c360/shared-kernel/consts/scheduling-nats-service-name.const';
import { Injectable } from '@c360/shared-kernel/dependency-manager/decorators/injectable.decorator';
import { AppointmentCreatedEvent } from '@c360/shared-kernel/events/appointment-created.event';
import { CREATE_APPOINTMENT_SUBJECT } from '@c360/shared-kernel/events/consts/create-appointment-subject.const';
import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { AppointmentInterface } from 'apps/scheduling-ms/src/core/domain/entities/appointment/interfaces/appointment.interface';
import { CreateAppointmentCommand } from '../../../core/application/commands/create-appointment.command';
import { CreateAppointmentUseCase } from '../../../core/application/use-cases/create-appointment.use-case';
import { EventSubscriberPort } from '../../../core/domain/ports/outbound/event-subscriber.port';

@Injectable()
@Controller()
export class SubscriberAdapter implements EventSubscriberPort, OnModuleInit {
  constructor(
    @Inject(SCHEDULING_NATS_SERIVE_NAME)
    private readonly client: ClientProxy,
    @Inject(CreateAppointmentUseCase)
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  @EventPattern(CREATE_APPOINTMENT_SUBJECT)
  async handleCreateAppointment(data: AppointmentCreatedEvent): Promise<AppointmentInterface> {
    const event: CreateAppointmentCommand = {
      date: data.date,
      serviceType: data.serviceType,
      cellphone: data.cellphone,
    };
    return await this.createAppointmentUseCase.execute(event);
  }
}
