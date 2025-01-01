import {
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateBookingDto {
  @IsOptional()
  @IsString()
  user_id?: string;

  @IsNotEmpty()
  @IsString()
  shop_room_id?: string;

  @IsNotEmpty()
  @IsString()
  shop_service_id?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsNotEmpty()
  time_from?: string;

  @IsNotEmpty()
  time_to?: string;

  @IsNotEmpty()
  date?: string;
}
