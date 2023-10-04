import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Param,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common'
import { FoodsService } from './foods.service'
import { CreateFoodDto } from './dto/create-food.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { AuthGuard } from '../../guards/auth/auth.guard'
import { RolesGuard } from '../../guards/roles/roles.guard'
import { Roles } from '../../decorators/roles/roles.decorator'
import { UpdateFoodDto } from './dto/update-food.dto'

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

  @ApiBearerAuth()
  @Roles('company', 'admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Post(':companyId')
  createFood(
    @Param('companyId') companyId: string,
    @Body() newFood: CreateFoodDto,
  ) {
    return this.foodsService.createFood(companyId, newFood)
  }

  @Get('search/:name')
  getFoodByName(@Param('name') name: string) {
    return this.foodsService.searchByName(name)
  }

  @Get('category/:category')
  getFoodsByCategory(@Param('category') category: string) {
    return this.foodsService.getFoodsByCategory(category)
  }

  @Get('company/:id')
  getFoodsByCompany(@Param('id') id: string, @Query('name') name: string) {
    return this.foodsService.getFoodsByCompany(id, name)
  }

  @Get('offerCompany/:id')
  getOfferFoodByCompany(@Param('id') id: string) {
    return this.foodsService.getOfferFoodsByCompany(id)
  }

  @Get(':id')
  getFood(@Param('id') id: string) {
    return this.foodsService.getFood(id)
  }

  @ApiBearerAuth()
  @Roles('company', 'admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() data: UpdateFoodDto) {
    return this.foodsService.updateFood(id, data)
  }
}
