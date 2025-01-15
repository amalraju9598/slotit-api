import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGender1736949951100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `shop_services` ADD `gender` ENUM('male', 'female', 'other', 'common') DEFAULT 'common' AFTER `image`;",
    );

    await queryRunner.query(
      'ALTER TABLE `shop_services` ADD `strike_through_charge` DECIMAL(10,2) DEFAULT NULL AFTER `charge`;',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('ALTER TABLE `shop_services` DROP  `gender`;');
  }
}
