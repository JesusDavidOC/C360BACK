import { ApplicationEvent } from '../application/application.event';
import { ServiceType } from '../enums/service-type.enum';
import { CREATE_APPOINTMENT_SUBJECT } from './consts/create-appointment-subject.const';

export class CreateAppointmentEvent implements ApplicationEvent {
  constructor(
    public readonly cellphone: string,
    public readonly date: Date,
    public readonly serviceType: ServiceType,
  ) {}

  public getSubject(): string {
    return CREATE_APPOINTMENT_SUBJECT;
  }
}
