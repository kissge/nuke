import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';
import { Category } from '../category/category.entity';

export class SaveRecordDto {
  readonly id?: number;
  readonly user: User;
  readonly project: Project;
  readonly category: Category;
  readonly date: Date;
  readonly duration: number;
  readonly title: string;
}
