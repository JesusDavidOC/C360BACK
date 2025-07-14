import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { AppointmentStatus } from '@c360/shared-kernel/enums/apponintment-status.enum';
import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';

@Entity({ name: 'appointments' })
@Index(['cellphone'])
@Index(['serviceType', 'technicianId'])
export class AppointmentReport {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'cellphone', type: 'varchar', length: 20 })
  cellphone: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'service_type', type: 'enum', enum: ServiceType })
  serviceType: ServiceType;

  @Column({ name: 'status', type: 'enum', enum: AppointmentStatus })
  status: AppointmentStatus;

  @Column({ name: 'technician_id', type: 'uuid', nullable: true })
  technicianId: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
