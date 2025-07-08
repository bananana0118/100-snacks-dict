import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  brandId: number;

  @Column()
  releaseAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
