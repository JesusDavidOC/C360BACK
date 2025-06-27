import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';

export interface CapacityCheckerPort {
  isAvailable(date: Date, serviceType: ServiceType): Promise<boolean>;
}
