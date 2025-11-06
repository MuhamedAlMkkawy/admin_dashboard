import { Test, TestingModule } from '@nestjs/testing';
import { PortalsPageService } from './portals-page.service';

describe('PortalsPageService', () => {
  let service: PortalsPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortalsPageService],
    }).compile();

    service = module.get<PortalsPageService>(PortalsPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
