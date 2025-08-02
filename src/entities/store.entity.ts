import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Snack } from './snack.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @ManyToMany(() => Snack, (snack) => snack.stores)
  snacks: Snack[];
}
