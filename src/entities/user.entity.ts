import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nickname: string;

  @Column()
  profileImg: string;

  @CreateDateColumn()
  createdAt: Date;
}
