import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cart } from './schema/cart.schema'
import { Model } from 'mongoose'
import { FoodsService } from 'src/foods/foods.service'
import { FoodCart } from './schema/foodCart.schema'
import { ProductToAdd } from './dto/carts.dto'

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(FoodCart.name) private foodCartModel: Model<FoodCart>,
    private foodsService: FoodsService,
  ) {}

  async createCart(userId: string) {
    return await this.cartModel.create({ user: userId })
  }

  async getCart(id: string) {
    return await this.cartModel
      .findOne({ user: id })
      .populate({
        path: 'foods',
        populate: {
          path: 'food',
        },
      })
      .populate({
        path: 'company',
        select: 'name shipping',
      })
  }

  async addFoodCart(
    cartId: string,
    foodId: string,
    cant: number,
    total: number,
  ) {
    return await this.foodCartModel.create({
      cart: cartId,
      food: foodId,
      cant,
      total,
    })
  }

  async getFoodCart(cartId: string, foodId: string) {
    return await this.foodCartModel
      .findOne({
        $and: [{ cart: cartId }, { food: foodId }],
      })
      .populate('food')
  }

  async deleteFoodCart(foodCartId: string) {
    return await this.foodCartModel.findByIdAndDelete(foodCartId)
  }

  async deleteAllFoodsCart(cartId: string) {
    return await this.foodCartModel.deleteMany({ cart: cartId })
  }

  async addToCart({ foodId, cant, userId, isNewCompany }: ProductToAdd) {
    const cart = await this.getCart(userId)
    const food = await this.foodsService.getFood(foodId)
    const foodCart = await this.getFoodCart(cart.id, food.id)

    if (isNewCompany) {
      await this.deleteAllFoodsCart(cart.id)

      const newFoodCart = await this.addFoodCart(
        cart.id,
        food.id,
        cant,
        cant * food.price,
      )

      cart.company = food.company
      cart.total = cant * food.price
      cart.foods = []
      cart.foods.push(newFoodCart.id)
    } else {
      if (foodCart) {
        const newCant = foodCart.cant + cant

        if (newCant <= 0) {
          await this.deleteFoodCart(foodCart.id)
          cart.total -= foodCart.total

          if (cart.foods.length <= 1) {
            cart.company = null
            cart.total = 0
          }
        } else {
          foodCart.cant = newCant
          foodCart.total = newCant * food.price
          cart.total += cant * food.price

          await foodCart.save()
        }
      } else {
        const newFoodCart = await this.addFoodCart(
          cart.id,
          food.id,
          cant,
          cant * food.price,
        )
        cart.total += cant * food.price
        cart.foods.push(newFoodCart.id)
      }
    }

    await cart.save()

    return 'success'
  }
}
