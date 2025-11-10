import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesPageService } from './features_page.service';

describe('FeaturesPageService', () => {
  let service: FeaturesPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeaturesPageService],
    }).compile();

    service = module.get<FeaturesPageService>(FeaturesPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
