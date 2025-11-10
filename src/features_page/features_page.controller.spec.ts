import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesPageController } from './features_page.controller';

describe('FeaturesPageController', () => {
  let controller: FeaturesPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeaturesPageController],
    }).compile();

    controller = module.get<FeaturesPageController>(FeaturesPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
