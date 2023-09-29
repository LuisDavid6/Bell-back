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
import { LoginDto } from './dto/auth.dto'
import { AuthGuard } from '@guards/auth/auth.guard'
import { ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  Login(@Body() data: LoginDto) {
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
