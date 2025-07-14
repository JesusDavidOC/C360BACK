import { AppointmentStatus } from '@c360/shared-kernel/enums/apponintment-status.enum';
import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { AppointmentReport } from './appointment.typeorm.entity';
import { AppointmentReportInterface } from './interfaces/appointment.interface';

export class AppointmentReportEntity extends AppointmentReport {
  public constructor(
    id: string,
    cellphone: string,
    date: Date,
    serviceType: ServiceType,
    status: AppointmentStatus,
    technicianId?: string,
  ) {
    super();
    this.id = id;
    this.cellphone = cellphone;
    this.date = date;
    this.serviceType = serviceType;
    this.status = status;
    this.technicianId = technicianId;
  }

  toPrimitive(): AppointmentReportInterface {
    return {
      id: this.id,
      date: this.date,
      serviceType: this.serviceType,
      technicianId: this.technicianId,
      cellphone: this.cellphone,
      createdAt: this.createdAt,
      status: this.status,
    };
  }
}
