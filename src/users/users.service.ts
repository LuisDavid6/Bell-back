import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schema/user.schema'
import { Model } from 'mongoose'
import { CreateUser } from './dto/user.dto'
import { CartsService } from 'src/carts/carts.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private cartsService: CartsService,
  ) {}

  async createUser(newUser: CreateUser) {
    try {
      const user = await this.userModel.create(newUser)
      const newCart = await this.cartsService.createCart(user.id)
      user.cart = newCart.id
      await user.save()

      return 'success'
    } catch (error) {
      return error
    }
  }

  async getUsers() {
    return await this.userModel.find()
  }

  async getUser(id: string) {
    return await this.userModel.findById(id).populate('cart')
  }

  async deleteUser(id: string) {
    try {
      await this.userModel.deleteOne({ _id: id })
      return 'success'
    } catch (error) {
      return error
    }
  }
}
