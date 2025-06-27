import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';

export interface AppointmentCapacityInterface {
  id: string;
  date: Date;
  serviceType: ServiceType;
  technician: {
    id: string;
  };
}
