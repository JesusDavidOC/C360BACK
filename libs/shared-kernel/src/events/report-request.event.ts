import { ApplicationEvent } from '../application/application.event';
import { REPORT_REQUESTED_SUBJECT } from './consts/report-requested-subject.const';

export class ReportRequestEvent implements ApplicationEvent {
  constructor(public readonly cellphone: string) {}

  public getSubject(): string {
    return REPORT_REQUESTED_SUBJECT;
  }
}
