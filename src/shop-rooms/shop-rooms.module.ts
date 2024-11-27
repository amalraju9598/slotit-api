import { Module } from '@nestjs/common';
import { ShopRoomsService } from './shop-rooms.service';
import { ShopRoomsController } from './shop-rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { ShopRoom } from './entities/shop-room.entity';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShopRoom]), CommonModule, ShopsModule],
  controllers: [ShopRoomsController],
  providers: [ShopRoomsService],
})
export class ShopRoomsModule {}
