import { AppointmentStatus } from '@c360/shared-kernel/enums/apponintment-status.enum';
import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { IsDate, IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateAppointmentOutputCommand {
  @IsUUID()
  id: string;

  @IsDate()
  createdAt: Date;

  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @IsDate()
  date: Date;

  @IsString()
  cellphone: string;

  @IsEnum(ServiceType)
  serviceType: ServiceType;
}
