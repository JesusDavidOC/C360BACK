import { ReportInterface } from './interfaces/report.interface';
import { Report } from './report.typeorm.entity';

export class ReportReportEntity extends Report {
  public constructor() {
    super();
  }

  toPrimitive(): ReportInterface {
    return {
      id: this.id,
      cellphone: this.cellphone,
      status: this.status,
      createdAt: this.createdAt,
      csvFile: this.csvFile,
    };
  }
}
