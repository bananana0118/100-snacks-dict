import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Snack } from './snack.entity';
@Entity({ name: 'brand', synchronize: true })
export class Taste {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 64 })
  code: string;

  @ManyToMany(() => Snack, (snack) => snack.tastes)
  snacks: Snack[];

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
