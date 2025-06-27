import { ApplicationEvent } from '../application/application.event';
import { TECHNICIAN_ASSIGNED_SUBJECT } from './consts/technician-assigned-subject.const';

export class TechnicianAssignedEvent implements ApplicationEvent {
  constructor(
    public readonly technician: { id: number },
    public readonly appointment: { id: number },
  ) {}

  public getSubject(): string {
    return TECHNICIAN_ASSIGNED_SUBJECT;
  }
}
