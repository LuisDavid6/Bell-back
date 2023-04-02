import { Module } from '@nestjs/common'
import { FoodsController } from './foods.controller'
import { FoodsService } from './foods.service'
import { Food, FoodSchema } from 'src/schemas/food.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
  ],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
