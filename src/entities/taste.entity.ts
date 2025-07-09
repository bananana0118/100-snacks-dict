import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class taste {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
