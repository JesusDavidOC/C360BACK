import { ApplicationEvent } from '../application/application.event';
import { ServiceType } from '../enums/service-type.enum';
import { VALIDATE_CAPACITY_SUBJECT } from './consts/validate-capacity-subject.const';

export class ValidateCapacityEvent implements ApplicationEvent {
  constructor(
    public readonly date: Date,
    public readonly serviceType: ServiceType,
  ) {}

  public getSubject(): string {
    return VALIDATE_CAPACITY_SUBJECT;
  }
}
