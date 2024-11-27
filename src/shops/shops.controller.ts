import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  async create(@Body() createShopDto: CreateShopDto) {
    return await this.shopsService.create(createShopDto);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.shopsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.shopsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return await this.shopsService.update(id, updateShopDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.shopsService.remove(id);
  }
}
