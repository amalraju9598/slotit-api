import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ResponseService } from 'src/common/services/response.service';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    private response: ResponseService,
    private userService: UsersService,
    private rolesService: RolesService,
  ) {}

  async create(createShopDto: CreateShopDto) {
    const newShop = this.shopRepository.create(createShopDto);
    const shop = await this.shopRepository.save(newShop);

    const shopOwner = await this.userService.createShopOwnerUser(
      shop,
      createShopDto.password,
    );

    return this.response.successResponse('Shop created', shop);
  }
  async findAll(query: PaginateQuery) {
    return paginate(query, this.shopRepository, {
      sortableColumns: ['id'],
      relations: [],
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name'],
      filterableColumns: {},
    });
  }

  async findOne(id: string): Promise<any> {
    const shop = await this.findOneById(id);
    return this.response.successResponse('Shop fetched', shop);
  }

  async update(id: string, updateShopDto: UpdateShopDto): Promise<any> {
    const shop = await this.findOneById(id);
    Object.assign(shop, updateShopDto);
    await this.shopRepository.save(shop);
    return this.response.successResponse('Shop updated');
  }

  async remove(id: string): Promise<any> {
    const shop = await this.findOneById(id);
    await this.shopRepository.remove(shop);
    return this.response.successResponse('Shop removed');
  }

  async findOneById(id: string): Promise<Shop> {
    const shop = await this.shopRepository.findOne({ where: { id } });
    if (!shop) {
      throw new NotFoundException(`Shop with ID "${id}" not found`);
    }
    return shop;
  }
}
