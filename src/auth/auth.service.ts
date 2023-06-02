import { Injectable } from '@nestjs/common'
import { CompaniesService } from 'src/companies/companies.service'
import { UsersService } from 'src/users/users.service'
import { Login } from './dto/auth.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private companiesService: CompaniesService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: Login) {
    try {
      const user = await this.usersService.getUser(email)
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
          // const payload = {
          //   id: user._id,
          //   username: user.username,
          // }

          // const token = await this.jwtService.signAsync(payload)

          // return { token }
          return user
        } else return { error: 'usuario o contraseña incorrectos' }
      } else {
        const company = await this.companiesService.getCompany(email)

        if (!company) return { error: 'usuario o contraseña incorrectos' }

        const isMatch = await bcrypt.compare(password, company.password)

        if (isMatch) {
          // const payload = {
          //   id: company._id,
          //   username: company.name,
          // }

          // const token = await this.jwtService.signAsync(payload)

          // return { token }
          return company
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
}
