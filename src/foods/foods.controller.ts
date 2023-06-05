import { Body, Controller, Get, Post, Req, Param } from '@nestjs/common'
import { FoodsService } from './foods.service'
import { CreateFoodDto } from './dto/food.dto'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

@Controller('foods')
@ApiTags('Foods')
export class FoodsController {
  constructor(private foodsService: FoodsService) {}

  @Get()
  getFoods(@Req() request: Request) {
    return this.foodsService.getFoods(request)
  }

  @Get('all')
  getAllFoods() {
    return this.foodsService.getAllFoods()
  }

  @Post()
  createFood(@Body() newFood: CreateFoodDto) {
    return this.foodsService.createFood(newFood)
  }

  @Get('search/:name')
  getFoodByName(@Param('name') name: string) {
    return this.foodsService.searchByName(name)
  }

  @Get('category/:category')
  getFoodsByCategory(@Param('category') category: string) {
    return this.foodsService.getFoodsByCategory(category)
  }

  @Get(':id')
  getFood(@Param('id') id: string) {
    return this.foodsService.getFood(id)
  }
}
