import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { AppointmentStatus } from '@c360/shared-kernel/enums/apponintment-status.enum';
import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';

@Entity({ name: 'appointments' })
@Index(['cellphone'])
@Index(['serviceType', 'technician'])
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

  @Column({ name: 'technician', type: 'varchar', length: 100, nullable: true })
  technician: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
