import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { CartsService } from './carts.service'
import { ProductToAdd } from './dto/carts.dto'

@Controller('cart')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Get('userId')
  getCart(@Param('userId') userId: string) {
    return this.cartsService.getCart(userId)
  }

  @Post()
  addToCart(@Body() ProductToAdd: ProductToAdd) {
    return this.cartsService.addToCart(ProductToAdd)
  }
}
