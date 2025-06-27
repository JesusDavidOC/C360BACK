import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { TechnicianInterface } from './interfaces/technician.interface';
import { Technician } from './technician.typeorm.entity';

export class TechnicianEntity extends Technician {
  public constructor(
    public readonly name: string,
    public readonly services: ServiceType[],
    public readonly maxAppointmentsPerDay: number,
  ) {
    super();
  }

  toPrimitive(): TechnicianInterface {
    return {
      id: this.id,
      name: this.name,
      services: this.services,
      maxAppointmentsPerDay: this.maxAppointmentsPerDay,
    };
  }
}
