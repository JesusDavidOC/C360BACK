import { Injectable } from '@c360/shared-kernel/dependency-manager/decorators/injectable.decorator';
import { AppointmentCreatedEvent } from '@c360/shared-kernel/events/appointment-created.event';
import { APPOINTMENT_CREATED_SUBJECT } from '@c360/shared-kernel/events/consts/appointment-created-subject.const';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

import { REPORTS_NATS_SERIVE_NAME } from '@c360/shared-kernel/consts/reports-nats-service-name.const';
import { TECHNICIAN_ASSIGNED_SUBJECT } from '@c360/shared-kernel/events/consts/technician-assigned-subject.const';
import { TechnicianAssignedEvent } from '@c360/shared-kernel/events/technician-assigned.event';
import { TechnicianAssignCommand } from 'apps/reports-ms/src/core/application/commands/technician-assign.command';
import { CreateAppointmentCommand } from '../../../core/application/commands/create-appointment.command';
import { CreateAppointmentUseCase } from '../../../core/application/use-cases/create-appointment.use-case';
import { TechnicianAssignUseCase } from '../../../core/application/use-cases/technician-assign.use-case';
import { EventSubscriberPort } from '../../../core/domain/ports/outbound/event-subscriber.port';

@Injectable()
export class SubscriberAdapter implements EventSubscriberPort, OnModuleInit {
  constructor(
    @Inject(REPORTS_NATS_SERIVE_NAME)
    private readonly client: ClientProxy,

    @Inject(CreateAppointmentUseCase)
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,

    @Inject(TechnicianAssignUseCase)
    private readonly technicianAssignUseCase: TechnicianAssignUseCase,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  @MessagePattern(APPOINTMENT_CREATED_SUBJECT)
  async handleAppointmentCreated(data: AppointmentCreatedEvent): Promise<void> {
    const event: CreateAppointmentCommand = {
      id: data.id,
      cellphone: data.cellphone,
      status: data.status,
      date: data.date,
      serviceType: data.serviceType,
    };
    await this.createAppointmentUseCase.execute(event);
  }

  @MessagePattern(TECHNICIAN_ASSIGNED_SUBJECT)
  handleTechnicianAssign(data: TechnicianAssignedEvent): void {
    const event: TechnicianAssignCommand = {
      appointmentId: data.appointment.id,
      technicianId: data.technician.id,
    };
    this.technicianAssignUseCase.execute(event);
  }
}
