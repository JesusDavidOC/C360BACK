import { Injectable } from '@c360/shared-kernel/dependency-manager/decorators/injectable.decorator';
import { AppointmentCreatedEvent } from '@c360/shared-kernel/events/appointment-created.event';
import { VALIDATE_CAPACITY_SUBJECT } from '@c360/shared-kernel/events/consts/validate-capacity-subject.const';
import { ValidateCapacityEvent } from '@c360/shared-kernel/events/validate-capacity.event';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AppointmentEntity } from '../../domain/entities/appointment/appointment.entity';
import { AppointmentInterface } from '../../domain/entities/appointment/interfaces/appointment.interface';
import { TechnicianNotAvailableException } from '../../domain/exceptions/technician-not-available.exception';
import { AppointmentRepositoryPort } from '../../domain/ports/outbound/appointment-repository.port';
import { EventPublisherPort } from '../../domain/ports/outbound/event-publisher.port';
import { CreateAppointmentCommand } from '../commands/create-appointment.command';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    @Inject('AppointmentRepositoryPort')
    private readonly appointmentRepository: AppointmentRepositoryPort,
    @Inject('EventPublisherPort')
    private readonly eventPublisher: EventPublisherPort,

    @Inject('APPOINTMENT_SERVICE')
    private readonly capacityClient: ClientProxy,
  ) {}

  async execute(payload: CreateAppointmentCommand): Promise<AppointmentInterface> {
    const appointment = new AppointmentEntity(payload.date, payload.cellphone, payload.serviceType);

    const response$ = this.capacityClient.send<{ available: boolean }, ValidateCapacityEvent>(
      VALIDATE_CAPACITY_SUBJECT,
      new ValidateCapacityEvent(appointment.date, appointment.serviceType),
    );
    const { available } = await firstValueFrom(response$);

    if (!available) {
      throw new TechnicianNotAvailableException(payload.date);
    }
    await this.appointmentRepository.save(appointment);

    const event = new AppointmentCreatedEvent(
      appointment.id,
      appointment.cellphone,
      appointment.date,
      appointment.serviceType,
      appointment.createdAt,
    );

    await this.eventPublisher.publishAppointmentCreated(event);

    return appointment.toPrimitive();
  }
}
