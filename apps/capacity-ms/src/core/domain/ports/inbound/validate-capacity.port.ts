import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';

export interface ValidateCapacityPort {
  isAvailable(payload: { date: Date; serviceType: ServiceType }): Promise<boolean>;
}
