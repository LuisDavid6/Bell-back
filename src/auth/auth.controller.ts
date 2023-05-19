import { Body, Controller, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Login } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  Login(@Body() data: Login) {
    return this.authService.login(data)
  }
}
