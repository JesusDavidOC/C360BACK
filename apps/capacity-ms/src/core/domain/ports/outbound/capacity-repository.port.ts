import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { AppointmentCapacityEntity } from '../../entities/appointment/appointment.entity';
import { AppointmentCapacity } from '../../entities/appointment/appointment.typeorm.entity';
import { Technician } from '../../entities/technician/technician.typeorm.entity';

export interface CapacityRepositoryPort {
  save(appointment: AppointmentCapacityEntity): Promise<AppointmentCapacity>;
  getAvailableTechnician(payload: { date: Date; serviceType: ServiceType }): Promise<Technician>;
}
