import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { Type } from 'class-transformer';
import { IsDate, IsEnum } from 'class-validator';
export class ValidateCapacityDto {
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsEnum(ServiceType)
  serviceType: ServiceType;
}
