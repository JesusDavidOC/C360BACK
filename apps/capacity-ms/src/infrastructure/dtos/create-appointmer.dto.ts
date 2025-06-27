import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { IsDate, IsEnum, IsObject } from 'class-validator';

export class CreateAppointmentDto {
  @IsDate()
  date: Date;

  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @IsObject()
  technician: { id: string };
}
