import { Test, TestingModule } from '@nestjs/testing';
import { ShopServiceService } from './shop-service.service';

describe('ShopServiceService', () => {
  let service: ShopServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopServiceService],
    }).compile();

    service = module.get<ShopServiceService>(ShopServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
