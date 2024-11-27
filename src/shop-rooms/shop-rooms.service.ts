import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopRoomDto } from './dto/create-shop-room.dto';
import { UpdateShopRoomDto } from './dto/update-shop-room.dto';
import { ShopRoom } from './entities/shop-room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { ResponseService } from 'src/common/services/response.service';
import { ShopsService } from 'src/shops/shops.service';

@Injectable()
export class ShopRoomsService {
  constructor(
    @InjectRepository(ShopRoom)
    private readonly shopRoomsRepository: Repository<ShopRoom>,
    private response: ResponseService,
    private shopsService: ShopsService,
  ) {}

  async create(createShopRoomDto: CreateShopRoomDto) {
    const shop = await this.shopsService.findOneById(createShopRoomDto.shop_id);
    const newShopRoom = this.shopRoomsRepository.create(createShopRoomDto);
    const shopRoom = await this.shopRoomsRepository.save(newShopRoom);

    return this.response.successResponse('Shop room created', shopRoom);
  }
  async findAll(query: PaginateQuery) {
    return paginate(query, this.shopRoomsRepository, {
      sortableColumns: ['id'],
      relations: [],
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name'],
      filterableColumns: {},
    });
  }

  async findOne(id: string): Promise<any> {
    const shopRoom = await this.findOneById(id);
    return this.response.successResponse('Shop room fetched', shopRoom);
  }

  async update(id: string, updateShopRoomDto: UpdateShopRoomDto): Promise<any> {
    const shopRoom = await this.findOneById(id);
    Object.assign(shopRoom, updateShopRoomDto);
    await this.shopRoomsRepository.save(shopRoom);
    return this.response.successResponse('Shop room updated');
  }

  async remove(id: string): Promise<any> {
    const shopRoom = await this.findOneById(id);
    await this.shopRoomsRepository.remove(shopRoom);
    return this.response.successResponse('Shop room removed');
  }

  async findOneById(id: string): Promise<ShopRoom> {
    const shopRoom = await this.shopRoomsRepository.findOne({ where: { id } });
    if (!shopRoom) {
      throw new NotFoundException(`Shop room with ID "${id}" not found`);
    }
    return shopRoom;
  }
}
