import { Column, PrimaryGeneratedColumn } from "typeorm";

export class UserRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column({ type: 'varchar', length: 36, nullable: true })
    role_id: string | null;

    @Column({ type: 'varchar', length: 36, nullable: true })
    user_id: string | null;

    @Column({ type: 'varchar', length: 36, nullable: true })
    shop_id: string | null;

    @Column({ type: 'varchar', length: 36, nullable: true })
    shop_room_id: string | null;
}
