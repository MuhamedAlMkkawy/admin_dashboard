import { Test, TestingModule } from '@nestjs/testing';
import { ModulesPageController } from './modules_page.controller';

describe('ModulesPageController', () => {
  let controller: ModulesPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModulesPageController],
    }).compile();

    controller = module.get<ModulesPageController>(ModulesPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
