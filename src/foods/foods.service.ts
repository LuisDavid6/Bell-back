import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateFoodDto } from './dto/food.dto'
import { Food } from 'src/schemas/food.schema'

@Injectable()
export class FoodsService {
  constructor(@InjectModel(Food.name) private foodModel: Model<Food>) {}

  async getFoods() {
    return await this.foodModel.find()
  }

  async createFood(newFood: CreateFoodDto) {
    return await this.foodModel.create(newFood)
  }
}
