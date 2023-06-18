import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Request } from 'express'
import { Model } from 'mongoose'
import { CompaniesService } from 'src/companies/companies.service'
import { CreateFoodDto } from './dto/food.dto'
import { Food } from './schema/food.schema'

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

  async createFood(newFood: CreateFoodDto) {
    const company = await this.companiesService.getCompanyById(newFood.company)
    if (company) {
      const food = await this.foodModel.create(newFood)
      await this.companiesService.addFood(company.id, food._id.toString())
      return food
    }
    throw new BadRequestException()
  }

  async searchByName(name: string) {
    return await this.foodModel.find({ name: { $regex: name, $options: 'i' } })
  }

  async getFoodsByCategory(category: string) {
    return await this.foodModel.find({
      category: { $regex: category, $options: 'i' },
    })
  }
}
