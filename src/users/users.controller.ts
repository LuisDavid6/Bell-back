import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUser, UpdateUser } from './dto/user.dto'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() newUser: CreateUser) {
    return this.usersService.createUser(newUser)
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers()
  }

  @Get('userCart/:email')
  getUserCart(@Param('email') email: string) {
    return this.usersService.getUserCart(email)
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id)
  }

  @Get('userInfo/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.getUser(email)
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() data: UpdateUser) {
    return this.usersService.updateUser(id, data)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id)
  }
}
