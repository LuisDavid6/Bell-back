import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { CartsService } from './carts.service'
import { ProductToAddCartDto } from './dto/carts.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('cart')
@ApiTags('Cart')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartsService.getCart(userId)
  }

  @Post()
  addToCart(@Body() ProductToAdd: ProductToAddCartDto) {
    return this.cartsService.addToCart(ProductToAdd)
  }
}
