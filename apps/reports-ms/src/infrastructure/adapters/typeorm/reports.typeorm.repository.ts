import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentReportEntity } from 'apps/reports-ms/src/core/domain/entities/appointments-report/appointment.entity';
import { AppointmentReport } from 'apps/reports-ms/src/core/domain/entities/appointments-report/appointment.typeorm.entity';
import { Repository } from 'typeorm';
import { ReportsRepositoryPort } from '../../../core/domain/ports/outbound/reports-repository.port';

export class ReportsRepository implements ReportsRepositoryPort {
  constructor(
    @InjectRepository(AppointmentReport)
    private readonly appointmentRepository: Repository<AppointmentReport>,
  ) {}

  async technicianAssign(payload: { appointmentId: string; technicianId: string }): Promise<void> {
    await this.appointmentRepository.update(
      { id: payload.appointmentId },
      { technicianId: payload.technicianId },
    );
  }

  async saveAppointment(payload: AppointmentReportEntity): Promise<void> {
    const appointment = this.appointmentRepository.create(payload);
    await this.appointmentRepository.save(appointment);
  }
}
