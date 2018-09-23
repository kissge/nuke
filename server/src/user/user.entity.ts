import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Record } from '../record/record.entity';

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

  @OneToMany(type => Record, record => record.user)
  records: Record[];
}
