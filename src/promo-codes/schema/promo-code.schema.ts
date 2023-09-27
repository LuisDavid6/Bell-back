import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Company } from 'src/companies/schema/company.schema'

export type promoCodeDocument = HydratedDocument<PromoCode>

@Schema()
export class PromoCode {
  @Prop({ required: true })
  code: string

  @Prop({ required: true })
  discount: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company

  @Prop({ required: true })
  createAt: string

  @Prop({ required: true })
  startDate: string

  @Prop({ required: true })
  expireDate: string
}

export const PromoCodeSchema = SchemaFactory.createForClass(PromoCode)

PromoCodeSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject.__v
    delete returnObject._id
  },
})
