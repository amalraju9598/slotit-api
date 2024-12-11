import { Booking } from 'src/bookings/entities/booking.entity';
import { Service } from 'src/services/entities/service.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
@Entity('shop_services')
export class ShopService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 36, nullable: true })
  shop_id: string | null;

  @Column({ type: 'varchar', length: 36, nullable: true })
  service_id: string | null;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  image: string | null;

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0.0 })
  charge: number;

  @Column({ type: 'int', default: 0 })
  time: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;

  @ManyToOne(() => Shop, (shop) => shop.shopServices)
  @JoinColumn({
    name: 'shop_id',
  })
  shop: Shop;

  @ManyToOne(() => Service, (service) => service.shopServices)
  @JoinColumn({
    name: 'service_id',
  })
  service: Service;

  @OneToMany(() => Booking, (Booking) => Booking.shopService)
  bookings: Booking[];
}
