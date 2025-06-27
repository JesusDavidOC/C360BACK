import { IsString } from 'class-validator';

export class GetAppointmentsByCellphoneCommand {
  @IsString()
  cellphone: string;
}
