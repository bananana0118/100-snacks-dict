import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Taste } from './taste.entity';
import { Brand } from './brand.entity';
import { SnackReaction } from './snack-reaction.entity';
import { SnackType } from './snack-type.entity';
import { Store } from './store.entity';
import { IsOptional } from 'class-validator';

@Entity({ name: 'snack', synchronize: true })
export class Snack {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => SnackType, (snackType) => snackType.snacks, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn()
  snackType: SnackType;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  snackImg: string; // 이미지 파일이 없을 수도 있으므로 null 허용

  @Column({ type: 'int' })
  kcal: number;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'date', nullable: true })
  releaseAt: Date;

  @ManyToMany(() => Taste, (taste) => taste.snacks, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'snack_tastes',
    joinColumn: {
      name: 'snack_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'taste_id',
      referencedColumnName: 'id',
    },
  })
  tastes: Taste[];

  @ManyToMany(() => Store, (store) => store.snacks, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'snack_stores',
    joinColumn: { name: 'snack_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'store_id', referencedColumnName: 'id' },
  })
  stores: Store[];

  @OneToMany(() => SnackReaction, (snackReactions) => snackReactions.snack)
  snackReactions: SnackReaction[];

  @ManyToOne(() => Brand, (brand) => brand.snacks, { onDelete: 'RESTRICT' })
  @JoinColumn()
  brand: Brand;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
