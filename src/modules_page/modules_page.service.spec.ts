import { Test, TestingModule } from '@nestjs/testing';
import { ModulesPageService } from './modules_page.service';

describe('ModulesPageService', () => {
  let service: ModulesPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModulesPageService],
    }).compile();

    service = module.get<ModulesPageService>(ModulesPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
