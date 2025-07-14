import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentCommand } from 'apps/capacity-ms/src/core/application/commands/create-appointment.command';
import { GetAvailableTechnicianCommand } from 'apps/capacity-ms/src/core/application/commands/get-available-technician.command';
import { Repository } from 'typeorm';
import { AppointmentCapacity } from '../../../core/domain/entities/appointment/appointment.typeorm.entity';
import { Technician } from '../../../core/domain/entities/technician/technician.typeorm.entity';
import { ValidateCapacityPort } from '../../../core/domain/ports/inbound/validate-capacity.port';
import { CapacityRepositoryPort } from '../../../core/domain/ports/outbound/capacity-repository.port';

export class CapacityRepository implements ValidateCapacityPort, CapacityRepositoryPort {
  constructor(
    @InjectRepository(AppointmentCapacity)
    private readonly appointmentRepository: Repository<AppointmentCapacity>,
    @InjectRepository(Technician)
    private readonly techniciansRepository: Repository<Technician>,
  ) {}

  async isAvailable(payload: { date: Date; serviceType: ServiceType }): Promise<boolean> {
    const technician = await this.getAvailableTechnician(payload);
    return technician !== null;
  }

  async getAvailableTechnician(payload: GetAvailableTechnicianCommand): Promise<Technician> {
    return this.techniciansRepository
      .createQueryBuilder('technician')
      .leftJoin('technician.appointments', 'appointment', 'appointment.date = :date', {
        date: payload.date,
      })
      .where(':serviceType = ANY(technician.services)', {
        serviceType: payload.serviceType,
      })
      .groupBy('technician.id')
      .having('COUNT(appointment.id) < technician.maxAppointmentsPerDay')
      .getOne();
  }

  async save(payload: CreateAppointmentCommand): Promise<AppointmentCapacity> {
    return this.appointmentRepository.save(payload);
  }
}
