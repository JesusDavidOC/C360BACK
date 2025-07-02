import { CreateAppointmentEvent } from '@c360/shared-kernel/events/create-appointment.event';

export interface EventSubscriberPort {
  handleCreateAppointment(event: CreateAppointmentEvent): Promise<void>;
}
