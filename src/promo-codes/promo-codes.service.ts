import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PromoCode } from './schema/promo-code.schema'
import { Model } from 'mongoose'
import { CompaniesService } from 'src/companies/companies.service'
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
      }
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async deletePromoCode(id: string) {
    return await this.promoCodeModel.deleteOne({ _id: id })
  }
}
