import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { Technician } from '../technician/technician.typeorm.entity';

@Entity({ name: 'appointments' })
@Index(['serviceType', 'technician'])
export class AppointmentCapacity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'service_type', type: 'enum', enum: ServiceType })
  serviceType: ServiceType;

  @ManyToOne(() => Technician)
  @JoinColumn({ name: 'technician_id', referencedColumnName: 'id' })
  technician: Technician;
}
