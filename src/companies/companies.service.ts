import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Company } from 'src/schemas/company.schema'
import { CreateCompanyDto } from './dto/company.dto'

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async createCompany(newCompany: CreateCompanyDto) {
    return await this.companyModel.create(newCompany)
  }

  async getCompanies() {
    return await this.companyModel.find()
  }
}
