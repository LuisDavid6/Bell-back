import { Module } from '@nestjs/common'
import { CartsService } from './carts.service'
import { CartsController } from './carts.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Cart, CartSchema } from './schema/cart.schema'
import { FoodsModule } from '@modules/foods/foods.module'
import { FoodCart, FoodCartSchema } from './schema/foodCart.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    MongooseModule.forFeature([
      { name: FoodCart.name, schema: FoodCartSchema },
    ]),
    FoodsModule,
  ],
  providers: [CartsService],
  controllers: [CartsController],
  exports: [CartsService],
})
export class CartsModule {}
