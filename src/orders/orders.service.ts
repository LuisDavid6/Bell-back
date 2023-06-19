import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Order } from './schema/order.schema'
import { Model } from 'mongoose'
import { CartsService } from 'src/carts/carts.service'
import { customAlphabet } from 'nanoid'
import { UsersService } from 'src/users/users.service'
import { CompaniesService } from 'src/companies/companies.service'

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private cartService: CartsService,
    private usersService: UsersService,
    private companiesService: CompaniesService,
  ) {}

  async createOrder(userId: string) {
    try {
      const cart = await this.cartService.getCart(userId)

      const nanoid = customAlphabet('0123456789', 6)
      const ticket = nanoid()

      const order = {
        ticket,
        user: cart.user,
        company: cart.company,
        foods: cart.foods,
        total: cart.total + cart.company.shipping,
      }

      const newOrder = await this.orderModel.create(order)

      await this.usersService.addOrder(userId, newOrder)

      await this.companiesService.addOrder(newOrder.company.email, newOrder)

      await this.cartService.cleanCart(cart.id)

      return 'success'
    } catch (error) {
      return error
    }
  }
}
