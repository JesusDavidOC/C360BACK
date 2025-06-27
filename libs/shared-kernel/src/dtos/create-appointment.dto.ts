import { ServiceType } from '../enums/service-type.enum';

export class CreateAppointmentDto {
  cellphone: string;
  date: string; // ISO 8601 format
  serviceType: ServiceType;
}
