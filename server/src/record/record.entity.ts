import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.records)
  user: User;

  @ManyToOne(type => Project, project => project.records)
  project: Project;

  @ManyToOne(type => Category, category => category.records)
  category: Category;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  duration: number;

  @Column({ length: 255 })
  title: string;
}
