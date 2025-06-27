import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ReportRequestUseCase } from '../../core/application/use-cases/report-request.use-case';
import { ReportRequestDto } from '../dtos/report-request.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportRequestUseCase: ReportRequestUseCase) {}

  @Post('request')
  @HttpCode(200)
  requestReport(@Body() payload: ReportRequestDto): void {
    this.reportRequestUseCase.execute(payload);
  }
}
