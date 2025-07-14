import { IsBoolean } from 'class-validator';

export class ValidateCapacityOutputDto {
  @IsBoolean()
  available: boolean;
}
