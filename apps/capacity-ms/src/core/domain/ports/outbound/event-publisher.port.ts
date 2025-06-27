import { TechnicianAssignedEvent } from '@c360/shared-kernel/events/technician-assigned.event';

export interface EventPublisherPort {
  publishTechnicianAssigned(event: TechnicianAssignedEvent): Promise<void>;
}
