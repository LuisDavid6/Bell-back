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
}
