import { Test, TestingModule } from '@nestjs/testing';
import { ShopRoomsController } from './shop-rooms.controller';
import { ShopRoomsService } from './shop-rooms.service';

describe('ShopRoomsController', () => {
  let controller: ShopRoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopRoomsController],
      providers: [ShopRoomsService],
    }).compile();

    controller = module.get<ShopRoomsController>(ShopRoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
