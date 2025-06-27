import { Appointment } from '../../entities/appointment/appointment.typeorm.entity';

export interface AppointmentRepositoryPort {
  save(appointment: Appointment): Promise<Appointment>;
  findByCellphone(cellphone: string): Promise<Appointment[]>;
}
