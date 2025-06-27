import { Injectable } from '@c360/shared-kernel/dependency-manager/decorators/injectable.decorator';
import { Inject } from '@nestjs/common';
import { AppointmentCapacityEntity } from '../../domain/entities/appointment/appointment.entity';
import { AppointmentCapacity } from '../../domain/entities/appointment/appointment.typeorm.entity';
import { CapacityRepositoryPort } from '../../domain/ports/outbound/capacity-repository.port';
import { CreateAppointmentCommand } from '../commands/create-appointment.command';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    @Inject('CapacityRepositoryPort')
    private readonly capacityRepository: CapacityRepositoryPort,
  ) {}

  async execute(payload: CreateAppointmentCommand): Promise<AppointmentCapacity> {
    const technician = await this.capacityRepository.getAvailableTechnician({ ...payload });
    const appointment = new AppointmentCapacityEntity(
      payload.date,
      payload.serviceType,
      technician,
    );
    const appointmentCreated = await this.capacityRepository.save(appointment);

    return appointmentCreated;
  }
}
