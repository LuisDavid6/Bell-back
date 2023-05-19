import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Company, companyDocument } from './schema/company.schema'
import { CreateCompanyDto } from './dto/company.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async createCompany(newCompany: CreateCompanyDto) {
    try {
      const hashedPasword = await bcrypt.hash(
        newCompany.password,
        Number(process.env.SALT_ROUNDS),
      )
      newCompany.password = hashedPasword

      return await this.companyModel.create(newCompany)
    } catch (error) {
      throw new BadRequestException({
        error: 'the email is already registered',
      })
    }
  }

  async getCompanies() {
    return await this.companyModel.find()
  }

  async getCompany(email: string) {
    return await this.companyModel.findOne({ email })
  }

  async getCompanyById(id: string) {
    return await this.companyModel.findById(id).populate('foods')
  }

  async addFood(companyId: string, foodId: string) {
    const company: companyDocument = await this.companyModel.findById(companyId)
    company.foods.push(foodId)
    await company.save()
  }
}
