import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopServiceDto } from './dto/create-shop-service.dto';
import { UpdateShopServiceDto } from './dto/update-shop-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopService } from './entities/shop-service.entity';
import { Repository } from 'typeorm';
import { ResponseService } from 'src/common/services/response.service';
import { ShopsService } from 'src/shops/shops.service';
import { ServicesService } from 'src/services/services.service';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class ShopServiceService {
  constructor(
    @InjectRepository(ShopService)
    private readonly shopServicesRepository: Repository<ShopService>,
    private response: ResponseService,
    private shopsService: ShopsService,
    private servicesService: ServicesService,
  ) {}

  async create(createShopServiceDto: CreateShopServiceDto) {
    const shop = await this.shopsService.findOneById(
      createShopServiceDto.shop_id,
    );
    const service = await this.servicesService.findOneById(
      createShopServiceDto.service_id,
    );

    const newShopService =
      this.shopServicesRepository.create(createShopServiceDto);
    const shopService = await this.shopServicesRepository.save(newShopService);

    return this.response.successResponse('Shop service created', shopService);
  }
  async findAll(query: PaginateQuery) {
    return paginate(query, this.shopServicesRepository, {
      sortableColumns: ['id'],
      relations: ['service'],
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name'],
      filterableColumns: {
        shop_id: [FilterOperator.EQ, FilterSuffix.NOT],
        service_id: [FilterOperator.EQ, FilterSuffix.NOT],
      },
    });
  }

  async findOne(id: string): Promise<any> {
    const shopService = await this.findOneById(id);
    return this.response.successResponse('Shop service fetched', shopService);
  }

  async update(
    id: string,
    updateShopServiceDto: UpdateShopServiceDto,
  ): Promise<any> {
    const shopService = await this.findOneById(id);
    Object.assign(shopService, updateShopServiceDto);
    await this.shopServicesRepository.save(shopService);
    return this.response.successResponse('Shop service updated');
  }

  async remove(id: string): Promise<any> {
    const shopService = await this.findOneById(id);
    await this.shopServicesRepository.remove(shopService);
    return this.response.successResponse('Shop service removed');
  }

  async findOneById(id: string): Promise<ShopService> {
    const shopService = await this.shopServicesRepository.findOne({
      where: { id },
    });
    if (!shopService) {
      throw new NotFoundException(`Shop service with ID "${id}" not found`);
    }
    return shopService;
  }
}
