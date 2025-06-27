import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';

export interface TechnicianInterface {
  id: string;
  name: string;
  services: ServiceType[];
  maxAppointmentsPerDay: number;
}
