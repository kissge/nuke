import { HttpException, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  findAll() {
    return this.projectRepository.find();
  }

  async save(project: Project) {
    return await this.projectRepository.save(project);
  }
}
