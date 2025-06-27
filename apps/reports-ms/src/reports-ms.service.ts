import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsMsService {
  getHello(): string {
    return 'Hello World!';
  }
}
