import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schema/user.schema'
import { Model } from 'mongoose'
import { CartsService } from '../carts/carts.service'
import { Order } from '../orders/schema/order.schema'
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private cartsService: CartsService,
    private jwtService: JwtService,
  ) {}

  async createUser(newUser: CreateUserDto) {
    try {
      const emailExists = await this.getUser(newUser.email)
      if (emailExists)
        throw new BadRequestException({
          error: 'the email is already registered',
        })

      const hashedPasword = await bcrypt.hash(
        newUser.password,
        Number(process.env.SALT_ROUNDS),
      )
      newUser.password = hashedPasword

      const user = await this.userModel.create(newUser)
      const newCart = await this.cartsService.createCart(user.id)

      user.cart = newCart.id
      await user.save()

      return {
        email: user.email,
        username: user.username,
        role: user.role,
      }
    } catch (error) {
      return { error }
    }
  }

  async getUsers() {
    return await this.userModel.find()
  }

  async getUser(email: string) {
    return await this.userModel.findOne({ email }).populate({
      path: 'cart',
      populate: [
        { path: 'foods' },
        { path: 'company', select: 'name shipping' },
      ],
    })
  }

  async getUserAuth(email: string) {
    const user = await this.userModel.findOne({ email })
    if (user) {
      const payload = {
        id: user._id,
        username: user.username,
        role: user.role,
      }

      const token = await this.jwtService.signAsync(payload, {
        expiresIn: '24h',
      })

      return {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        token,
      }
    }
    return null
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id).populate({
      path: 'cart',
      populate: {
        path: 'foods',
      },
    })
  }

  async getUserCart(email: string) {
    const user = await this.userModel.findOne({ email })
    if (!user) throw new BadRequestException()
    return await this.cartsService.getCart(user.id)
  }

  async deleteUser(id: string) {
    try {
      await this.userModel.deleteOne({ _id: id })
      return 'success'
    } catch (error) {
      return { error }
    }
  }

  async updateUser(userId: string, data: UpdateUserDto) {
    try {
      await this.userModel.findByIdAndUpdate(userId, data)
      return 'success'
    } catch (error) {
      return { error }
    }
  }

  async addOrder(userId: string, order: Order) {
    try {
      const user = await this.userModel.findById(userId)

      user.orders.push(order)
      await user.save()

      return 'success'
    } catch (error) {
      return error
    }
  }
}
