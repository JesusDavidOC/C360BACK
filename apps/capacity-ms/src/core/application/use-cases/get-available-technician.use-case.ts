import { Injectable } from '@c360/shared-kernel/dependency-manager/decorators/injectable.decorator';
import { Inject } from '@nestjs/common';
import { Technician } from '../../domain/entities/technician/technician.typeorm.entity';
import { CapacityRepositoryPort } from '../../domain/ports/outbound/capacity-repository.port';
import { GetAvailableTechnicianCommand } from '../commands/get-available-technician.command';

@Injectable()
export class GetAvailableTechnicianUseCase {
  constructor(
    @Inject('CapacityRepositoryPort')
    private readonly appointmentRepository: CapacityRepositoryPort,
  ) {}

  async execute(payload: GetAvailableTechnicianCommand): Promise<Technician> {
    return await this.appointmentRepository.getAvailableTechnician(payload);
  }
}
