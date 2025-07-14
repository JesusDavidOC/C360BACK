import { ReportStatus } from '../../../enums/report-statuses.enum';

export interface ReportInterface {
  id: string;
  cellphone: string;
  status: ReportStatus;
  createdAt: Date;
  csvFile?: string;
}
