import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ValidateCapacityUseCase } from '../../core/application/use-cases/validate-capacity.use-case';
import { ValidateCapacityDto } from '../dtos/validate-capacity.dto';

@Controller('capacity')
export class CapacityController {
  constructor(private readonly validateCapacityUseCase: ValidateCapacityUseCase) {}

  @Get('validate')
  async validateCapacity(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    payload: ValidateCapacityDto,
  ): Promise<boolean> {
    return await this.validateCapacityUseCase.execute(payload);
  }
}
