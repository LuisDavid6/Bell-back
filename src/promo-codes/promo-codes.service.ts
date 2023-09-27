import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PromoCode } from './schema/promo-code.schema'
import { Model } from 'mongoose'

@Injectable()
export class PromoCodesService {
  constructor(
    @InjectModel(PromoCode.name) private promoCode: Model<PromoCode>,
  ) {}

  async getPromoCodes() {
    return await this.promoCode.find()
  }

  async getPromoCodesCompany(companyId: string) {
    return await this.promoCode.find({ company: companyId })
  }

  async deletePromoCode(id: string) {
    return await this.promoCode.deleteOne({ _id: id })
  }
}
