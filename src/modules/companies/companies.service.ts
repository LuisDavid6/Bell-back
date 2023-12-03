import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Company } from './schema/company.schema'
import { CreateCompanyDto } from './dto/create-company.dto'
import * as bcrypt from 'bcrypt'
import { Order } from '../orders/schema/order.schema'
import { PromoCodeDocument } from '../promo-codes/schema/promo-code.schema'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { FoodDocument } from '../foods/schema/food.schema'

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
      return { error }
    }
  }

  async getCompanies() {
    return await this.companyModel.find()
  }

  async updateCompany(id: string, data: UpdateCompanyDto) {
    try {
      await this.companyModel.findByIdAndUpdate(id, data)
      return 'success'
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async addCompanyCategory(companyId: string, category: string) {
    const company = await this.companyModel.findById(companyId)

    company.categories = [...company.categories, category]
    await company.save()

    return 'success'
  }

  async deletecompanyCategory(companyId: string, category: string) {
    try {
      await this.companyModel
        .findByIdAndUpdate(companyId, { $pull: { categories: category } })
        .exec()

      return 'success'
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async getCompany(email: string) {
    return await this.companyModel.findOne({ email })
  }

  async getCompanyCategories(id: string) {
    const company = await this.companyModel.findById(id)
    return company.categories
  }

  async getCompanyById(id: string) {
    return await this.companyModel
      .findById(id)
      .populate('foods')
      .populate('outstandings')
  }

  async getCompanyAuth(email: string) {
    const company = await this.companyModel.findOne({ email })
    if (company) {
      return {
        id: company.id,
        email: company.email,
        username: company.name,
        role: company.role,
      }
    }
    return null
  }

  async getCompanyInfo(id: string) {
    return await this.companyModel.findById(id, {
      date: 0,
      active: 0,
      foods: 0,
      orders: 0,
      password: 0,
      categories: 0,
      outstandings: 0,
    })
  }

  async addFood(companyId: string, food: FoodDocument) {
    const company = await this.companyModel.findById(companyId)

    company.foods.push(food)
    return await company.save()
  }

  async removeFood(id: string, companyId: string) {
    try {
      await this.companyModel
        .findByIdAndUpdate(companyId, { $pull: { foods: id } })
        .exec()

      return 'success'
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async addOrder(companyEmail: string, order: Order) {
    try {
      const company = await this.companyModel.findOne({ email: companyEmail })

      company.orders.push(order)
      await company.save()

      return 'success'
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async addPromoCode(id: string, promoCode: PromoCodeDocument) {
    const company = await this.companyModel.findById(id)

    company.promoCodes = [...company.promoCodes, promoCode]
    await company.save()

    return 'success'
  }

  async removePromoCode(id: string, companyId: string) {
    const company = await this.companyModel
      .findById(companyId)
      .populate('promoCodes')

    company.promoCodes = company.promoCodes.filter((code) => code.id !== id)

    await company.save()

    return 'success'
  }

  async UpdateOutstandings(foodsId: string[], companyId: string) {
    try {
      await this.companyModel.findByIdAndUpdate(companyId, {
        outstandings: foodsId,
      })

      return 'success'
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async getOutstandings(companyId: string) {
    try {
      const company = await this.companyModel
        .findById(companyId)
        .populate('outstandings')

      return company.outstandings
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
