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

@Entity({ name: 'snack_reaction', synchronize: true })
export class SnackReaction {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => User, (user) => user.snackReactions, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Snack, (snack) => snack.snackReactions, {
    onDelete: 'CASCADE',
  })
  snack: Snack;

  @Column({ default: 0, type: 'smallint' })
  type: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
