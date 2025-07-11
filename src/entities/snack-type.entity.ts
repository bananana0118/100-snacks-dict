import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Snack } from './snack.entity';

@Entity()
export class SnackType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @OneToMany(() => Snack, (snack) => snack.snackType)
  snacks: Snack[];
}
