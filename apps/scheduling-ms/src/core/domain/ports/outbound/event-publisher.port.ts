import { AppointmentCreatedEvent } from '@c360/shared-kernel/events/appointment-created.event';
import { ReportRequestEvent } from '@c360/shared-kernel/events/report-request.event';

export interface EventPublisherPort {
  publishAppointmentCreated(event: AppointmentCreatedEvent): Promise<void>;
  publishRequestReport(cellphone: ReportRequestEvent): Promise<void>;
}
