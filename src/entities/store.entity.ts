import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Store {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
