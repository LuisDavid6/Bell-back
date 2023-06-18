import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Order } from './schema/order.schema'
import { Model } from 'mongoose'
import { CartsService } from 'src/carts/carts.service'
import { customAlphabet } from 'nanoid'

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private cartService: CartsService,
  ) {}

  async createOrder(userId: string) {
    const cart = await this.cartService.getCart(userId)

    const nanoid = customAlphabet('0123456789', 6)
    const ticket = nanoid()

    const newOrder = {
      ticket,
      user: cart.user,
      company: cart.company,
      foods: cart.foods,
      total: cart.total,
    }
    console.log(newOrder)
    return newOrder
  }
}
