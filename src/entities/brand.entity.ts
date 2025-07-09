import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Brand {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
