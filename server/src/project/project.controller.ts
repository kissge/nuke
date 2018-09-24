import { Get, Post, Controller, Body, HttpException } from '@nestjs/common';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { SaveProjectDto } from './save-project.dto';

@Controller('api/admin/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Post()
  async save(@Body() saveProjectDto: SaveProjectDto) {
    try {
      return await this.projectService.save(saveProjectDto as Project);
    } catch (error) {
      throw new HttpException(error.code, 400);
    }
  }
}
