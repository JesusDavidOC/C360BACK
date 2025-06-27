import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { Appointment } from './appointment.typeorm.entity';
import { AppointmentInterface } from './interfaces/appointment.interface';

export class AppointmentEntity extends Appointment {
  public constructor(
    public readonly date: Date,
    public readonly cellphone: string,
    public readonly serviceType: ServiceType,
  ) {
    super();
  }

  toPrimitive(): AppointmentInterface {
    return {
      id: this.id,
      cellphone: this.cellphone,
      date: this.date,
      status: this.status,
      serviceType: this.serviceType,
      createdAt: this.createdAt,
    };
  }
}
