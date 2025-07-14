import { CreateAppointmentDto } from '@c360/shared-kernel/dtos/create-appointment.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAppointmentUseCase } from '../../core/application/use-cases/create-appointment.use-case';
import { GetAppointmentsByCellphoneUseCase } from '../../core/application/use-cases/get-appointments-by-cellphone.use-case';
import { AppointmentInterface } from '../../core/domain/entities/appointment/interfaces/appointment.interface';

@Controller('')
export class AppointmentsController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly getAppointmentsByCellphoneUseCase: GetAppointmentsByCellphoneUseCase,
  ) {}

  @Post()
  async createAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentInterface> {
    return this.createAppointmentUseCase.execute(createAppointmentDto);
  }

  @Get(':cellphone')
  async getAppointmentsByCellphone(
    @Param('cellphone') cellphone: string,
  ): Promise<AppointmentInterface[]> {
    return this.getAppointmentsByCellphoneUseCase.execute({ cellphone });
  }
}
