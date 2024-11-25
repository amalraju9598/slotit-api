import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsMobilePhone,
} from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  contact_email: string;

  @IsMobilePhone()
  @IsNotEmpty()
  contact_phone: string;

  @IsString()
  @IsOptional()
  password: string;
}
