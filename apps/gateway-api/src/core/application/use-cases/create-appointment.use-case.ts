import { SCHEDULING_NATS_SERIVE_NAME } from '@c360/shared-kernel/consts/scheduling-nats-service-name.const';
import { Injectable } from '@c360/shared-kernel/dependency-manager/decorators/injectable.decorator';
import { CREATE_APPOINTMENT_SUBJECT } from '@c360/shared-kernel/events/consts/create-appointment-subject.const';
import { CreateAppointmentEvent } from '@c360/shared-kernel/events/create-appointment.event';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateAppointmentCommand } from '../commands/input/create-appointment.command';
import { CreateAppointmentOutputCommand } from '../commands/output/create-appointment.output.command';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    @Inject(SCHEDULING_NATS_SERIVE_NAME)
    private readonly schedulingClient: ClientProxy,
  ) {}

  async execute(payload: CreateAppointmentCommand): Promise<CreateAppointmentOutputCommand> {
    const appointmentCreated = this.schedulingClient.send<
      CreateAppointmentOutputCommand,
      CreateAppointmentEvent
    >(
      CREATE_APPOINTMENT_SUBJECT,
      new CreateAppointmentEvent(payload.cellphone, payload.date, payload.serviceType),
    );

    return await firstValueFrom(appointmentCreated);
  }
}
