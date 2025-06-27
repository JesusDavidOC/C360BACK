import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../../../core/domain/entities/appointment/appointment.typeorm.entity';
import { AppointmentRepositoryPort } from '../../../core/domain/ports/outbound/appointment-repository.port';

export class AppointmentsRepository implements AppointmentRepositoryPort {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async save(appointment: Appointment): Promise<Appointment> {
    return this.appointmentRepository.save(appointment);
  }

  async findByCellphone(cellphone: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({ where: { cellphone } });
  }
}
