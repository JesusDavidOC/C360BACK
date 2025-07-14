import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { IsDate, IsEnum, IsObject, IsOptional, IsUUID } from 'class-validator';

export class CreateAppointmentCommand {
  @IsUUID()
  id: string;

  @IsDate()
  date: Date;

  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @IsObject()
  @IsOptional()
  technician?: { id: string };
}
