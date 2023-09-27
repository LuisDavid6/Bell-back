import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { NewOrder } from './dto/order.dto'

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() { userId }: NewOrder) {
    return this.ordersService.createOrder(userId)
  }

  @Get('company/:id')
  getCompanyOrders(@Param('id') companyId: string) {
    return this.ordersService.getCompanyOrders(companyId)
  }

  @Get('user/:id')
  getUserOrders(@Param('id') userId: string) {
    return this.ordersService.getUserOrders(userId)
  }

  @Patch('updatestatus/:id')
  updateOrderStatus(@Param('id') OrderId: string) {
    return this.ordersService.updateOrderStatus(OrderId)
  }
}
