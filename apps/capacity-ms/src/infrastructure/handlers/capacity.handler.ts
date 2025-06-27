import { VALIDATE_CAPACITY_SUBJECT } from '@c360/shared-kernel/events/consts/validate-capacity-subject.const';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ValidateCapacityUseCase } from '../../core/application/use-cases/validate-capacity.use-case';
import { ValidateCapacityDto } from '../dtos/validate-capacity.dto';

@Controller('capacity')
export class CapacityHandler {
  constructor(private readonly validateCapacityUseCase: ValidateCapacityUseCase) {}

  @MessagePattern(VALIDATE_CAPACITY_SUBJECT)
  async validateCapacity(@Payload() payload: ValidateCapacityDto): Promise<boolean> {
    return await this.validateCapacityUseCase.execute(payload);
  }
}
