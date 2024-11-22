import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  Generated,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
@Entity('services')
export class Service {
  @PrimaryColumn('varchar', { length: 36 })
  @Generated('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  image: string;

  @Column('varchar')
  identifier: string;
}
