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

@Entity()
export class Snack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => SnackType, (snackType) => snackType.snacks)
  @JoinColumn()
  snackType: SnackType;

  @Column()
  price: number;

  @Column()
  @IsOptional()
  snackImg: string; // 이미지 파일이 없을 수도 있으므로 null 허용

  @Column()
  kcal: number;

  @Column()
  capacity: number;

  @Column({ nullable: true })
  releaseAt: Date;

  @ManyToMany(() => Taste, (taste) => taste.snacks, { eager: true })
  @JoinTable({
    name: 'snack_tastes',
    joinColumn: { name: 'snack_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'taste_id', referencedColumnName: 'id' },
  })
  tastes: Taste[];

  @ManyToMany(() => Store, (store) => store.snacks, { eager: true })
  @JoinTable({
    name: 'snack_stores',
    joinColumn: { name: 'snack_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'store_id', referencedColumnName: 'id' },
  })
  stores: Store[];

  @OneToMany(() => SnackReaction, (snackReaction) => snackReaction.snack)
  snackReaction: SnackReaction[];

  @ManyToOne(() => Brand, (brand) => brand.snacks)
  @JoinColumn()
  brand: Brand;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
