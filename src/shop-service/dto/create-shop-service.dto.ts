import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsMobilePhone,
  IsNumber,
} from 'class-validator';

export class CreateShopServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsNotEmpty()
  shop_id: string;

  @IsString()
  @IsNotEmpty()
  service_id: string;

  @IsNotEmpty()
  @IsNumber()
  charge?: number;

  @IsOptional()
  @IsNumber()
  strike_through_charge?: number;

  @IsNotEmpty()
  @IsNumber()
  time?: number;
}
