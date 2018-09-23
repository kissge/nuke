import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 127, unique: true })
  email: string;

  @Column({ length: 500, nullable: true })
  name: string;

  @Column({ length: 1023, nullable: true })
  avatar: string;

  @Column()
  isAdmin: boolean;
}
