import { AppointmentCreatedEvent } from '@c360/shared-kernel/events/appointment-created.event';
import { TechnicianAssignedEvent } from '@c360/shared-kernel/events/technician-assigned.event';

export interface EventSubscriberPort {
  handleAppointmentCreated(event: AppointmentCreatedEvent): Promise<void>;
  handleTechnicianAssign(event: TechnicianAssignedEvent): void;
}
