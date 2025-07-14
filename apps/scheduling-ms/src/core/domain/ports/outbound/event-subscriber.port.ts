import { CreateAppointmentEvent } from '@c360/shared-kernel/events/create-appointment.event';
import { AppointmentInterface } from '../../entities/appointment/interfaces/appointment.interface';

export interface EventSubscriberPort {
  handleCreateAppointment(event: CreateAppointmentEvent): Promise<AppointmentInterface>;
}
