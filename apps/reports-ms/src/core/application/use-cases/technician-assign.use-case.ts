import { Injectable } from '@c360/shared-kernel/dependency-manager/decorators/injectable.decorator';
import { Inject } from '@nestjs/common';
import { ReportsRepositoryPort } from '../../domain/ports/outbound/reports-repository.port';
import { TechnicianAssignCommand } from '../commands/technician-assign.command';

@Injectable()
export class TechnicianAssignUseCase {
  constructor(
    @Inject('ReportsRepositoryPort')
    private readonly reportsRepository: ReportsRepositoryPort,
  ) {}

  async execute(payload: TechnicianAssignCommand): Promise<void> {
    await this.reportsRepository.technicianAssign(payload);
  }
}
