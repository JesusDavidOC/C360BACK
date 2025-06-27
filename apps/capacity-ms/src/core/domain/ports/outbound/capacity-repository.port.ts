import { GetAvailableTechnicianCommand } from '../../../application/commands/get-available-technician.command';
import { AppointmentCapacityEntity } from '../../entities/appointment/appointment.entity';
import { AppointmentCapacity } from '../../entities/appointment/appointment.typeorm.entity';
import { Technician } from '../../entities/technician/technician.typeorm.entity';

export interface CapacityRepositoryPort {
  save(appointment: AppointmentCapacityEntity): Promise<AppointmentCapacity>;
  getAvailableTechnician(payload: GetAvailableTechnicianCommand): Promise<Technician>;
}
