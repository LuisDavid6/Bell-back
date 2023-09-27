import { Module } from '@nestjs/common'
import { PromoCodesController } from './promo-codes.controller'
import { PromoCodesService } from './promo-codes.service'
import { MongooseModule } from '@nestjs/mongoose'
import { PromoCode, PromoCodeSchema } from './schema/promo-code.schema'
import { CompaniesModule } from 'src/companies/companies.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PromoCode.name, schema: PromoCodeSchema },
    ]),
    CompaniesModule,
  ],
  controllers: [PromoCodesController],
  providers: [PromoCodesService],
})
export class PromoCodesModule {}
