import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { PromoCodesService } from './promo-codes.service'
import { CreatePromoCodeDto } from './dto/create-promo-code.dto'

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

  @Post(':companyId')
  createPromocode(
    @Param('companyId') companyId: string,
    @Body() newPromoCode: CreatePromoCodeDto,
  ) {
    return this.promoCodesService.createPromocode(companyId, newPromoCode)
  }

  @Delete(':id')
  deletePromoCode(@Param('id') id: string) {
    return this.promoCodesService.deletePromoCode(id)
  }
}
