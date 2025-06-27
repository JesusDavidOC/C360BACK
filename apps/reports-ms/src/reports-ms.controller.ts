import { Controller, Get } from '@nestjs/common';
import { ReportsMsService } from './reports-ms.service';

@Controller()
export class ReportsMsController {
  constructor(private readonly reportsMsService: ReportsMsService) {}

  @Get()
  getHello(): string {
    return this.reportsMsService.getHello();
  }
}
