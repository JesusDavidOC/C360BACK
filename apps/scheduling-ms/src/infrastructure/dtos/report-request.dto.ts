import { IsString } from 'class-validator';

export class ReportRequestDto {
  @IsString()
  cellphone: string;
}
