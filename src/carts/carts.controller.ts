import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { CartsService } from './carts.service'
import { ProductToAdd } from './dto/carts.dto'

@Controller('cart')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Get(':id')
  getCart(@Param('id') id: string) {
    return this.cartsService.getCart(id)
  }

  @Post()
  addToCart(@Body() ProductToAdd: ProductToAdd) {
    return this.cartsService.addToCart(ProductToAdd)
  }
}
