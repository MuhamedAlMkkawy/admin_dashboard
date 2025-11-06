import { Test, TestingModule } from '@nestjs/testing';
import { PortalsPageController } from './portals-page.controller';

describe('PortalsPageController', () => {
  let controller: PortalsPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortalsPageController],
    }).compile();

    controller = module.get<PortalsPageController>(PortalsPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
