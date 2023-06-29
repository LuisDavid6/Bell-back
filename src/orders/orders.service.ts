import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Order, OrderStatus } from './schema/order.schema'
import { Model } from 'mongoose'
import { CartsService } from 'src/carts/carts.service'
import { customAlphabet } from 'nanoid'
import { UsersService } from 'src/users/users.service'
import { CompaniesService } from 'src/companies/companies.service'

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private ordersModel: Model<Order>,
    private cartService: CartsService,
    private usersService: UsersService,
    private companiesService: CompaniesService,
  ) {}

  async createOrder(userId: string) {
    try {
      const cart = await this.cartService.getCart(userId)

      const nanoid = customAlphabet('0123456789', 6)
      const ticket = nanoid()

      const foods = []
      cart.foods.map((food) => {
        foods.push({
          total: food.total,
          cant: food.cant,
          cart: food.cart,
          food: {
            name: food.food.name,
            description: food.food.description,
            price: food.food.price,
            offer: food.food.offer,
            offerPrice: food.food.offerPrice,
            img: food.food.img,
            category: food.food.category,
            company: food.food.company,
          },
        })
      })

      const order = {
        ticket,
        user: cart.user,
        company: cart.company,
        foods,
        total: cart.total + cart.company.shipping,
      }

      const newOrder = await this.ordersModel.create(order)

      await this.usersService.addOrder(userId, newOrder)

      await this.companiesService.addOrder(newOrder.company.email, newOrder)

      await this.cartService.cleanCart(cart.id)

      return 'success'
    } catch (error) {
      return error
    }
  }

  async getCompanyOrders(companyId: string) {
    return await this.ordersModel.find({ company: companyId })
  }

  async getUserOrders(userId: string) {
    return await this.ordersModel.find({ user: userId })
  }

  async updateOrderStatus(id: string) {
    try {
      const order = await this.ordersModel.findById(id)

      const newStatus =
        order.status === OrderStatus.Pending
          ? OrderStatus.InProccess
          : order.status === OrderStatus.InProccess
          ? OrderStatus.Shipping
          : order.status === OrderStatus.Shipping
          ? OrderStatus.Received
          : OrderStatus.Received

      order.status = newStatus
      await order.save()

      return 'success'
    } catch (error) {
      return { error }
    }
  }
}
