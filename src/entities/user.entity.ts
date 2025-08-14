import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { SnackReaction } from './snack-reaction.entity';

@Entity({ name: 'user', synchronize: true })
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 64, unique: true })
  nickname: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profileImg: string;

  //0기본 1. 좋아요 2. 싫어요
  @OneToMany(() => SnackReaction, (reaction) => reaction.user)
  snackReactions: SnackReaction[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
