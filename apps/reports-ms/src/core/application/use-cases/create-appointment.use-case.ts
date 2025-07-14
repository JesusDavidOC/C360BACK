import { Injectable } from '@c360/shared-kernel/dependency-manager/decorators/injectable.decorator';
import { Inject } from '@nestjs/common';
import { AppointmentReportEntity } from '../../domain/entities/appointments-report/appointment.entity';
import { ReportsRepositoryPort } from '../../domain/ports/outbound/reports-repository.port';
import { CreateAppointmentCommand } from '../commands/create-appointment.command';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    @Inject('ReportsRepositoryPort')
    private readonly reportsRepository: ReportsRepositoryPort,
  ) {}

  async execute(payload: CreateAppointmentCommand): Promise<void> {
    const appointment = new AppointmentReportEntity(
      payload.id,
      payload.cellphone,
      payload.date,
      payload.serviceType,
      payload.status,
      null,
    );
    await this.reportsRepository.saveAppointment(appointment);
  }
}
