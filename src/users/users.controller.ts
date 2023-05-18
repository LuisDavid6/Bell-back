import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUser } from './dto/user.dto'

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

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id)
  }
}
