import { Body, Controller, Get, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Login } from './dto/auth.dto'
import { AuthGuard } from './auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  Login(@Body() data: Login) {
    return this.authService.login(data)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
