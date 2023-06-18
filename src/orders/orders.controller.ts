import { Body, Controller, Post } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { NewOrder } from './dto/order.dto'

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() { userId }: NewOrder) {
    return this.ordersService.createOrder(userId)
  }
}
