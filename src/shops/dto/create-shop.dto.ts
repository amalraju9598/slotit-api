import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsObject()
  @IsNotEmpty()
  address: object;
}
