import { Controller, Delete, Get, Param } from '@nestjs/common'
import { PromoCodesService } from './promo-codes.service'

@Controller('promo-codes')
export class PromoCodesController {
  constructor(private promoCodesService: PromoCodesService) {}

  @Get()
  getPromoCodes() {
    return this.promoCodesService.getPromoCodes()
  }

  @Get('company/:id')
  getPromoCodesCompany(@Param('id') id: string) {
    return this.promoCodesService.getPromoCodesCompany(id)
  }

  @Delete(':id')
  deletePromoCode(@Param('id') id: string) {
    return this.promoCodesService.deletePromoCode(id)
  }
}
