import { Controller, Get } from '@nestjs/common'
import { PromoCodesService } from './promo-codes.service'

@Controller('promo-codes')
export class PromoCodesController {
  constructor(private promoCodesService: PromoCodesService) {}

  @Get()
  getPromoCodes() {
    return this.promoCodesService.getPromoCodes()
  }
}
