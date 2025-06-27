import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { Technician } from '../technician/technician.typeorm.entity';
import { AppointmentCapacity } from './appointment.typeorm.entity';
import { AppointmentCapacityInterface } from './interfaces/appointment.interface';

export class AppointmentCapacityEntity extends AppointmentCapacity {
  public constructor(
    public readonly date: Date,
    public readonly serviceType: ServiceType,
    public readonly technician: Technician,
  ) {
    super();
  }

  toPrimitive(): AppointmentCapacityInterface {
    return {
      id: this.id,
      date: this.date,
      serviceType: this.serviceType,
      technician: { id: this.technician.id },
    };
  }
}
