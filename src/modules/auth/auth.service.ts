import { Injectable } from '@nestjs/common'
import { CompaniesService } from '@modules/companies/companies.service'
import { UsersService } from '@modules/users/users.service'
import { LoginDto } from './dto/auth.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private companiesService: CompaniesService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.usersService.getUser(email)
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
          const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
          }

          const token = await this.jwtService.signAsync(payload)

          return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            token,
          }
        } else return { error: 'usuario o contraseña incorrectos' }
      } else {
        const company = await this.companiesService.getCompany(email)

        if (!company) return { error: 'usuario o contraseña incorrectos' }

        const isMatch = await bcrypt.compare(password, company.password)

        if (isMatch) {
          const payload = {
            id: company._id,
            username: company.name,
            role: company.role,
          }

          const token = await this.jwtService.signAsync(payload)

          return {
            id: company.id,
            email: company.email,
            username: company.name,
            role: company.role,
            token,
          }
        } else return { error: 'usuario o contraseña incorrectos' }
      }
    } catch (error) {
      return error
    }
  }

  async verifyUser(id: string) {
    const user = await this.usersService.getUserById(id)
    if (!user) {
      return await this.companiesService.getCompanyById(id)
    }
    return user
  }

  async verifyUserByEmail(email: string) {
    const user = await this.usersService.getUserAuth(email)
    if (!user) {
      return await this.companiesService.getCompanyAuth(email)
    }
    return user
  }
}
