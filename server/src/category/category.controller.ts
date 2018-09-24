import { Get, Post, Controller, Body, HttpException } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { SaveCategoryDto } from './save-category.dto';

@Controller('api')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('category')
  findAll() {
    return this.categoryService.findAll();
  }

  @Post('admin/category')
  async save(@Body() saveCategoryDto: SaveCategoryDto) {
    try {
      return await this.categoryService.save(saveCategoryDto as Category);
    } catch (error) {
      throw new HttpException(error.code, 400);
    }
  }
}
