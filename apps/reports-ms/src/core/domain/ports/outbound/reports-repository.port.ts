import { AppointmentReportEntity } from '../../entities/appointments-report/appointment.entity';

export interface ReportsRepositoryPort {
  saveAppointment(appointment: AppointmentReportEntity): Promise<void>;
  technicianAssign(payload: { appointmentId: string; technicianId: string }): Promise<void>;
}
