import { Injectable } from '@c360/shared-kernel/dependency-manager/decorators/injectable.decorator';
import { Inject } from '@nestjs/common';
import { AppointmentInterface } from '../../domain/entities/appointment/interfaces/appointment.interface';
import { AppointmentRepositoryPort } from '../../domain/ports/outbound/appointment-repository.port';
import { GetAppointmentsByCellphoneCommand } from '../commands/get-appointments-by-cellphone.command';

@Injectable()
export class GetAppointmentsByCellphoneUseCase {
  constructor(
    @Inject('AppointmentRepositoryPort')
    private readonly appointmentRepository: AppointmentRepositoryPort,
  ) {}

  async execute(payload: GetAppointmentsByCellphoneCommand): Promise<AppointmentInterface[]> {
    return await this.appointmentRepository.findByCellphone(payload.cellphone);
  }
}
