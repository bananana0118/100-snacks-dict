import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Snack } from './snack.entity';
import { SnackReaction } from './snack-reaction.entity';

export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nickname: string;

  @Column()
  profileImg: string;

  @ManyToMany(() => Snack, (snack) => snack.snackReaction)
  @JoinTable({ name: 'user_liked_snacks' })
  snackReaction: Snack[];

  @OneToMany(() => SnackReaction, (reaction) => reaction.user)
  reactions: SnackReaction[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
