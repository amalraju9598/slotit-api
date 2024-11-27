import { Test, TestingModule } from '@nestjs/testing';
import { ShopServiceController } from './shop-service.controller';
import { ShopServiceService } from './shop-service.service';

describe('ShopServiceController', () => {
  let controller: ShopServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopServiceController],
      providers: [ShopServiceService],
    }).compile();

    controller = module.get<ShopServiceController>(ShopServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
