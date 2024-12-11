import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ResponseService } from 'src/common/services/response.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private response: ResponseService,
  ) {}
  async create(bookingData: Partial<Booking>): Promise<Booking> {
    const booking = this.bookingRepository.create(bookingData);
    return await this.bookingRepository.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingRepository.find({
      relations: ['user', 'shopRoom'],
    });
  }

  async findOne(id: string): Promise<Booking | null> {
    return await this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'shopRoom'],
    });
  }

  async update(id: string, bookingData: Partial<Booking>): Promise<Booking> {
    await this.bookingRepository.update(id, bookingData);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.bookingRepository.softDelete(id);
  }
}
