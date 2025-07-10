import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Taste } from './taste.entity';
import { Brand } from './brand.entity';
import { SnackReaction } from './snack-reaction.entity';

@Entity()
export class Snack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @Column()
  snackImg: string;

  @Column()
  kcal: number;

  @Column()
  capacity: number;

  @Column()
  releaseAt: Date;

  @ManyToMany(() => Taste, (taste) => taste.snacks, { eager: true })
  @JoinTable({
    name: 'snack_tastes',
    joinColumn: { name: 'snack_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'taste_id', referencedColumnName: 'id' },
  })
  tastes: Taste[];

  @ManyToMany(() => SnackReaction, (snackReaction) => snackReaction.snack)
  snackReaction: SnackReaction[];

  @ManyToOne(() => Brand, (brand) => brand.snacks)
  @JoinColumn()
  brand: Brand;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
