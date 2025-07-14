import { Injectable } from '@c360/shared-kernel/dependency-manager/decorators/injectable.decorator';
import { Inject } from '@nestjs/common';
import { ValidateCapacityPort } from '../../domain/ports/inbound/validate-capacity.port';
import { ValidateCapacityOutputCommand } from '../commands/outputs/validate-capacity-output.command';
import { ValidateCapacityCommand } from '../commands/validate-capacity.command';

@Injectable()
export class ValidateCapacityUseCase {
  constructor(
    @Inject('ValidateCapacityPort')
    private readonly capacityCheckerRepository: ValidateCapacityPort,
  ) {}

  async execute(payload: ValidateCapacityCommand): Promise<ValidateCapacityOutputCommand> {
    const isAvailable = await this.capacityCheckerRepository.isAvailable(payload);
    return { available: isAvailable };
  }
}
