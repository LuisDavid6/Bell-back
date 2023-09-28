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
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
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
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.updateUser(id, data)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id)
  }
}
