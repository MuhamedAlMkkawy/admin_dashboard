import { Test, TestingModule } from '@nestjs/testing';
import { DemoRequestsController } from './demo_requests.controller';

describe('DemoRequestsController', () => {
  let controller: DemoRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemoRequestsController],
    }).compile();

    controller = module.get<DemoRequestsController>(DemoRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
