import { IsUUID } from 'class-validator';

export class TechnicianAssignCommand {
  @IsUUID()
  appointmentId: string;

  @IsUUID()
  technicianId: string;
}
