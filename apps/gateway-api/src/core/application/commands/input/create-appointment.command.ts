import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { IsDate, IsEnum, IsString } from 'class-validator';

export class CreateAppointmentCommand {
  @IsString()
  cellphone: string;

  @IsDate()
  date: Date;

  @IsEnum(ServiceType)
  serviceType: ServiceType;
}
