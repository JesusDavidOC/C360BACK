import { ServiceType } from '@c360/shared-kernel/enums/service-type.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AppointmentCapacity } from '../appointment/appointment.typeorm.entity';

@Entity('technicians')
export class Technician {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({
    name: 'services',
    type: 'enum',
    enum: ServiceType,
    array: true,
  })
  services: ServiceType[];

  @Column({ name: 'max_appointments_per_day', type: 'int' })
  maxAppointmentsPerDay: number;

  @OneToMany(() => AppointmentCapacity, (appointment) => appointment.technician)
  appointments: AppointmentCapacity[];
}
