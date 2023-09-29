import { Module } from '@nestjs/common'
import { FoodsController } from './foods.controller'
import { FoodsService } from './foods.service'
import { Food, FoodSchema } from './schema/food.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { CompaniesModule } from '../companies/companies.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
    CompaniesModule,
  ],
  controllers: [FoodsController],
  providers: [FoodsService],
  exports: [FoodsService],
})
export class FoodsModule {}
