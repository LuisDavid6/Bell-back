import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Request } from 'express'
import { Model } from 'mongoose'
import { CompaniesService } from '../companies/companies.service'
import { CreateFoodDto } from './dto/create-food.dto'
import { Food } from './schema/food.schema'
import { UpdateFoodDto } from './dto/update-food.dto'

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<Food>,
    private companiesService: CompaniesService,
  ) {}

  async getFoods(request: Request) {
    return await this.foodModel
      .find(request.query)
      .setOptions({ sanitizeFilter: true })
      .exec()
  }

  async getFood(id: string, pupulate = false) {
    if (pupulate) return await this.foodModel.findById(id).populate('company')
    return await this.foodModel.findById(id)
  }

  async getFoodsByCompany(companyId: string, name: string) {
    return await this.foodModel.find({
      company: companyId,
      name: { $regex: name, $options: 'i' },
    })
  }

  async getOfferFoodsByCompany(companyId: string) {
    return await this.foodModel.find({ company: companyId, offer: true })
  }

  async getAllFoods() {
    return await this.foodModel.find()
  }

  async createFood(companyId: string, newFood: CreateFoodDto) {
    try {
      const company = await this.companiesService.getCompanyById(companyId)
      if (company) {
        const food = await this.foodModel.create({
          ...newFood,
          company: companyId,
        })
        await this.companiesService.addFood(companyId, food)
        return 'success'
      }
      throw new BadRequestException()
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async searchByName(name: string) {
    return await this.foodModel.find({ name: { $regex: name, $options: 'i' } })
  }

  async getFoodsByCategory(category: string) {
    return await this.foodModel.find({
      category: { $regex: category, $options: 'i' },
    })
  }

  async updateFood(foodId: string, data: UpdateFoodDto) {
    try {
      await this.foodModel.findByIdAndUpdate(foodId, data)
      return 'success'
    } catch (error) {
      return { error }
    }
  }

  async deleteFood(foodId: string) {
    try {
      const food = await this.foodModel
        .findById(foodId)
        .populate('company')
        .exec()

      if (!food) {
        throw new NotFoundException(`Food not found`)
      }

      await this.foodModel.deleteOne({ _id: foodId }).exec()

      return await this.companiesService.removeFood(food.id, food.company.id)
    } catch (error) {
      return { error }
    }
  }
}
