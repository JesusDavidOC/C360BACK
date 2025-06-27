import { AppointmentStatus } from '@c360/shared-kernel/enums/apponintment-status.enum';
import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';

export interface AppointmentInterface {
  id: string;
  date: Date;
  cellphone: string;
  createdAt: Date;
  status: AppointmentStatus;
  serviceType: ServiceType;
}
