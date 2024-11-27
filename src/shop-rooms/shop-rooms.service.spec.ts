import { Test, TestingModule } from '@nestjs/testing';
import { ShopRoomsService } from './shop-rooms.service';

describe('ShopRoomsService', () => {
  let service: ShopRoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopRoomsService],
    }).compile();

    service = module.get<ShopRoomsService>(ShopRoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
