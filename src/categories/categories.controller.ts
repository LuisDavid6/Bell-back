import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { NewCategory, UpdateCategory } from './dto/category.dto'

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories
  }

  @Get(':id')
  getCategory(@Param('id') id: string) {
    return this.categoriesService.getCategory(id)
  }

  @Post()
  createCategory(@Body() newCategory: NewCategory) {
    return this.categoriesService.createCategory(newCategory)
  }

  @Patch(':id')
  getFoodByName(@Param('id') id: string, @Body() data: UpdateCategory) {
    return this.categoriesService.updateCategory(id, data)
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id)
  }
}
