import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schema/user.schema'
import { Model } from 'mongoose'
import { CreateUser } from './dto/user.dto'
import { CartsService } from 'src/carts/carts.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private cartsService: CartsService,
  ) {}

  async createUser(newUser: CreateUser) {
    try {
      const hashedPasword = await bcrypt.hash(
        newUser.password,
        Number(process.env.SALT_ROUNDS),
      )
      newUser.password = hashedPasword

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

  async getUser(email: string) {
    return await this.userModel.findOne({ email })
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id).populate({
      path: 'cart',
      populate: {
        path: 'foods',
      },
    })
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email }).populate({
      path: 'cart',
      populate: {
        path: 'foods',
      },
    })
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
