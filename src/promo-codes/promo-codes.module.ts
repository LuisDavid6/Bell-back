import { Module } from '@nestjs/common'
import { PromoCodesController } from './promo-codes.controller'
import { PromoCodesService } from './promo-codes.service'
import { MongooseModule } from '@nestjs/mongoose'
import { PromoCode, PromoCodeSchema } from './schema/promo-code.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PromoCode.name, schema: PromoCodeSchema },
    ]),
  ],
  controllers: [PromoCodesController],
  providers: [PromoCodesService],
})
export class PromoCodesModule {}
