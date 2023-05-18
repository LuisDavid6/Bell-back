import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cart } from './schema/cart.schema'
import { Model } from 'mongoose'
import { ProductToAdd } from './dto/carts.dto'
import { FoodsService } from 'src/foods/foods.service'

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private foodsService: FoodsService,
  ) {}

  async createCart(userId: string) {
    return await this.cartModel.create({ user: userId })
  }

  async getCart(userId: string) {
    return await this.cartModel.findById(userId)
  }

  async addToCart({ foodId, userId, isNewCompany }: ProductToAdd) {
    const cart = await this.getCart(userId)
    const food = await this.foodsService.getFood(foodId)

    cart.foods.push(food)

    if (isNewCompany) {
      cart.company = food.company
      cart.total = food.price
    } else {
      cart.total += food.price
    }

    await cart.save()

    return 'success'
  }
}
