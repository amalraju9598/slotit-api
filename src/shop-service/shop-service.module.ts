import { Module } from '@nestjs/common';
import { ShopServiceService } from './shop-service.service';
import { ShopServiceController } from './shop-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopService } from './entities/shop-service.entity';
import { CommonModule } from 'src/common/common.module';
import { ShopsModule } from 'src/shops/shops.module';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopService]),
    CommonModule,
    ShopsModule,
    ServicesModule,
  ],
  controllers: [ShopServiceController],
  providers: [ShopServiceService],
})
export class ShopServiceModule {}