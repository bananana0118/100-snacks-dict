import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Snack } from './snack.entity';
import { User } from './user.entity';

//0: 선택 안함
//1: Like
//2: disLike

@Entity()
export class SnackReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reactions, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Snack, (snack) => snack.snackReaction, {
    onDelete: 'CASCADE',
  })
  snack: Snack;

  @Column({ default: 0 })
  type: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
