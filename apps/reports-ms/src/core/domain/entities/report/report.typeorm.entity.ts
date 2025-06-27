import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ReportStatus } from '../../enums/report-statuses.enum';

@Entity({ name: 'reports' })
export class Report {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'cellphone', type: 'varchar', length: 20 })
  cellphone: string;

  @Column({ name: 'status', type: 'enum', enum: ReportStatus })
  status: ReportStatus[];

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'csv_file', type: 'text' })
  csvFile: string;
}
