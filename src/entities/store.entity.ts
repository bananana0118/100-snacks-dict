import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
