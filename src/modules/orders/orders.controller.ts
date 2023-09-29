import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { OrdersService } from './orders.service'
import { NewOrderDto } from './dto/new-order.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/guards/auth/auth.guard'

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() { userId }: NewOrderDto) {
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

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('updatestatus/:id')
  updateOrderStatus(@Param('id') OrderId: string) {
    return this.ordersService.updateOrderStatus(OrderId)
  }
}
