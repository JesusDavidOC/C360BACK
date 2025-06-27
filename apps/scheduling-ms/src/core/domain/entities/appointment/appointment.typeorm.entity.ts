import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn } from 'typeorm';
import { AppointmentStatus } from '@c360/shared-kernel/enums/apponintment-status.enum';
import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';

@Entity({ name: 'appointments' })
@Index(['cellphone'])
@Index(['date', 'serviceType'])
@Index(['id', 'cellphone'])
export class Appointment {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'cellphone', type: 'varchar' })
  cellphone: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({
    name: 'service_type',
    type: 'enum',
    enum: ServiceType,
  })
  serviceType: ServiceType;

  @Column({
    name: 'status',
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
