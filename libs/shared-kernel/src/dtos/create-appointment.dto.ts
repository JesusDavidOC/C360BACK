import { IsDate, IsEnum, IsString } from 'class-validator';
import { ServiceType } from '../enums/service-type.enum';

export class CreateAppointmentDto {
  @IsDate()
  date: Date;

  @IsString()
  cellphone: string;

  @IsEnum(ServiceType)
  serviceType: ServiceType;
}
