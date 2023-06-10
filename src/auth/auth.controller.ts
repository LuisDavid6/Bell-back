import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Login } from './dto/auth.dto'
import { AuthGuard } from './auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  Login(@Body() data: Login) {
    return this.authService.login(data)
  }

  @UseGuards(AuthGuard)
  @Get('verifyUser')
  verifyUser(@Request() req) {
    return this.authService.verifyUser(req.user.id)
  }

  @Get('verify/:email')
  verifyUserByEmail(@Param('email') email: string) {
    return this.authService.verifyUserByEmail(email)
  }
}
