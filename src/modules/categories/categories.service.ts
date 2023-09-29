import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Category } from './schema/category.schema'
import { Model } from 'mongoose'
import { NewCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getCategories() {
    return await this.categoryModel.find()
  }

  async getCategory(id: string) {
    return await this.categoryModel.findById(id)
  }

  async createCategory(newCategory: NewCategoryDto) {
    return await this.categoryModel.create(newCategory)
  }

  async updateCategory(id: string, data: UpdateCategoryDto) {
    return await this.categoryModel.findByIdAndUpdate(id, data)
  }

  async deleteCategory(id: string) {
    return await this.categoryModel.deleteOne({ _id: id })
  }
}
