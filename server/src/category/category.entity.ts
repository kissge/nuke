import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Record } from '../record/record.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 127, unique: true })
  name: string;

  @OneToMany(type => Record, record => record.category)
  records: Record[];
}
