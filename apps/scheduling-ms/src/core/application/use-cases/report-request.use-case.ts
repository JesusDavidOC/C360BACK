import { Injectable } from '@c360/shared-kernel/dependency-manager/decorators/injectable.decorator';
import { ReportRequestEvent } from '@c360/shared-kernel/events/report-request.event';
import { Inject } from '@nestjs/common';
import { EventPublisherPort } from '../../domain/ports/outbound/event-publisher.port';
import { ReportRequestCommand } from '../commands/report-request.command';

@Injectable()
export class ReportRequestUseCase {
  constructor(
    @Inject('EventPublisherPort')
    private readonly eventPublisher: EventPublisherPort,
  ) {}

  async execute(payload: ReportRequestCommand): Promise<void> {
    const reportRequestEvent = new ReportRequestEvent(payload.cellphone);
    await this.eventPublisher.publishRequestReport(reportRequestEvent);
  }
}
