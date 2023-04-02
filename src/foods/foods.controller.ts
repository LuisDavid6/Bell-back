import { Body, Controller, Get, Post } from '@nestjs/common'
import { FoodsService } from './foods.service'
import { CreateFoodDto } from './dto/food.dto'

@Controller('foods')
export class FoodsController {
  constructor(private foodsService: FoodsService) {}

  @Get()
  getFoods() {
    return this.foodsService.getFoods()
  }

  @Post()
  createFood(@Body() newFood: CreateFoodDto) {
    return this.foodsService.createFood(newFood)
  }
}
