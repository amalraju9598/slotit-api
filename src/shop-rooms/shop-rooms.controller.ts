import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShopRoomsService } from './shop-rooms.service';
import { CreateShopRoomDto } from './dto/create-shop-room.dto';
import { UpdateShopRoomDto } from './dto/update-shop-room.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('shop-rooms')
export class ShopRoomsController {
  constructor(private readonly shopRoomsService: ShopRoomsService) {}

  @Post()
  async create(@Body() createShopRoomDto: CreateShopRoomDto) {
    return await this.shopRoomsService.create(createShopRoomDto);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.shopRoomsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.shopRoomsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShopRoomDto: UpdateShopRoomDto,
  ) {
    return await this.shopRoomsService.update(id, updateShopRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.shopRoomsService.remove(id);
  }
}
