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
      const emailExists = await this.getCompany(newCompany.email)
      if (emailExists)
        throw new BadRequestException({
          error: 'the email is already registered',
        })

      const hashedPasword = await bcrypt.hash(
        newCompany.password,
        Number(process.env.SALT_ROUNDS),
      )
      newCompany.password = hashedPasword

      await this.companyModel.create(newCompany)

      return 'success'
    } catch (error) {
      return error
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

  async getCompanyInfo(id: string) {
    return await this.companyModel.findById(id)
  }

  async addFood(companyId: string, foodId: string) {
    const company: companyDocument = await this.companyModel.findById(companyId)
    company.foods.push(foodId)
    await company.save()
  }
}
