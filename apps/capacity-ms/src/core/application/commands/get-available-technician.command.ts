import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { IsDate, IsEnum } from 'class-validator';

export class GetAvailableTechnicianCommand {
  @IsDate()
  date: Date;

  @IsEnum(ServiceType)
  serviceType: ServiceType;
}
