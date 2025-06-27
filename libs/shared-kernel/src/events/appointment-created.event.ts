import { ApplicationEvent } from '../application/application.event';
import { ServiceType } from '../enums/service-type.enum';
import { APPOINTMENT_CREATED_SUBJECT } from './consts/appointment-created-subject.const';

export class AppointmentCreatedEvent implements ApplicationEvent {
  constructor(
    public readonly id: string,
    public readonly cellphone: string,
    public readonly date: Date,
    public readonly serviceType: ServiceType,
    public readonly createdAt: Date,
  ) {}

  public getSubject(): string {
    return APPOINTMENT_CREATED_SUBJECT;
  }
}
