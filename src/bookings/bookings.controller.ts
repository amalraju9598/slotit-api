import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingsService) {}

  @Post()
  async create(@Body() bookingData: Partial<Booking>): Promise<Booking> {
    return await this.bookingService.create(bookingData);
  }

  @Get()
  async findAll(): Promise<Booking[]> {
    return await this.bookingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Booking | null> {
    return await this.bookingService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() bookingData: Partial<Booking>,
  ): Promise<Booking> {
    return await this.bookingService.update(id, bookingData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.bookingService.delete(id);
  }
}
