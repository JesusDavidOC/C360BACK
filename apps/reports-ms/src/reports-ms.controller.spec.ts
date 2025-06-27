import { Test, TestingModule } from '@nestjs/testing';
import { ReportsMsController } from './reports-ms.controller';
import { ReportsMsService } from './reports-ms.service';

describe('ReportsMsController', () => {
  let reportsMsController: ReportsMsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReportsMsController],
      providers: [ReportsMsService],
    }).compile();

    reportsMsController = app.get<ReportsMsController>(ReportsMsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(reportsMsController.getHello()).toBe('Hello World!');
    });
  });
});
