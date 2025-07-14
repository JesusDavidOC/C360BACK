import { AppointmentStatus } from '@c360/shared-kernel/enums/apponintment-status.enum';
import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { IsDate, IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateAppointmentCommand {
  @IsUUID()
  id: string;

  @IsString()
  cellphone: string;

  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @IsDate()
  date: Date;

  @IsEnum(ServiceType)
  serviceType: ServiceType;
}
