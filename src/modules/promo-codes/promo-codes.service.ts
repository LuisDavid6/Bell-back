import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PromoCode } from './schema/promo-code.schema'
import { CompaniesService } from '../companies/companies.service'
import { CreatePromoCodeDto } from './dto/create-promo-code.dto'
import { DateTime } from 'luxon'

@Injectable()
export class PromoCodesService {
  constructor(
    @InjectModel(PromoCode.name) private promoCodeModel: Model<PromoCode>,
    private companiesService: CompaniesService,
  ) {}

  async getPromoCodes() {
    return await this.promoCodeModel.find()
  }

  async getPromoCodesCompany(companyId: string) {
    return await this.promoCodeModel.find({ company: companyId })
  }

  async createPromocode(companyId: string, newPromoCode: CreatePromoCodeDto) {
    try {
      const company = await this.companiesService.getCompanyById(companyId)

      if (company) {
        const createAt = DateTime.now()
          .setZone('America/Bogota')
          .toFormat('dd/LL/y h:mm:ss a')

        const promoCode = await this.promoCodeModel.create({
          ...newPromoCode,
          createAt,
          company: company._id,
        })

        await this.companiesService.addPromoCode(company.id, promoCode)

        return 'success'
      } else {
        throw new BadRequestException()
      }
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async deletePromoCode(id: string) {
    try {
      const promo = await this.promoCodeModel.findById(id).populate('company')

      await this.promoCodeModel.deleteOne({ _id: id })

      await this.companiesService.removePromoCode(id, promo.company.id)

      return 'success'
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
