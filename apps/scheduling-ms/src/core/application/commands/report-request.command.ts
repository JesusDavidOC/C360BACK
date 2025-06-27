import { IsString } from 'class-validator';

export class ReportRequestCommand {
  @IsString()
  cellphone: string;
}
