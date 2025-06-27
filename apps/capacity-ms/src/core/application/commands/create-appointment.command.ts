import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { IsDate, IsEnum, IsObject, IsOptional } from 'class-validator';

export class CreateAppointmentCommand {
  @IsDate()
  date: Date;

  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @IsObject()
  @IsOptional()
  technician?: { id: string };
}
