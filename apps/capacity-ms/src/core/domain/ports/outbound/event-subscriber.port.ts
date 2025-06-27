import { AppointmentCreatedEvent } from '@c360/shared-kernel/events/appointment-created.event';

export interface EventSubscriberPort {
  handleAppointmentCreated(event: AppointmentCreatedEvent): Promise<void>;
}
