import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { AuthGuard } from 'src/guards/auth/auth.guard'
import { Roles } from 'src/decorators/roles/roles.decorator'
import { RolesGuard } from 'src/guards/roles/roles.guard'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser)
  }

  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
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

  @ApiBearerAuth()
  @Roles('user', 'admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.updateUser(id, data)
  }

  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id)
  }
}
