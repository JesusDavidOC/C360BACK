import { CreateAppointmentDto } from '@c360/shared-kernel/dtos/create-appointment.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateAppointmentUseCase } from '../../core/application/use-cases/create-appointment.use-case';
import { CreateAppointmentOutputDto } from '../dtos/output/create-appointment.output.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly createAppointmentUseCase: CreateAppointmentUseCase) {}

  @Post()
  async createAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<CreateAppointmentOutputDto> {
    return this.createAppointmentUseCase.execute(createAppointmentDto);
  }
}
