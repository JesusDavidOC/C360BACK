import { IsBoolean } from 'class-validator';

export class ValidateCapacityOutputCommand {
  @IsBoolean()
  available: boolean;
}
