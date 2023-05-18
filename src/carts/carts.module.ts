import { Module } from '@nestjs/common'
import { CartsService } from './carts.service'
import { CartsController } from './carts.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Cart, CartSchema } from './schema/cart.schema'
import { FoodsModule } from 'src/foods/foods.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    FoodsModule,
  ],
  providers: [CartsService],
  controllers: [CartsController],
  exports: [CartsService],
})
export class CartsModule {}
