import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { DateTime } from 'luxon'
import { Order } from '../../orders/schema/order.schema'

import { FoodDocument } from '../../foods/schema/food.schema'
import { PromoCodeDocument } from '../../promo-codes/schema/promo-code.schema'

export type CompanyDocument = HydratedDocument<Company>

@Schema()
export class Company {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({
    default:
      'https://res.cloudinary.com/dnc21abpp/image/upload/v1697660636/Bell/restaurant-default_fdsqd4.jpg',
  })
  image: string

  @Prop({ required: true })
  address: string

  @Prop()
  tel: string

  @Prop()
  horary: string

  @Prop()
  shipping: number

  @Prop({ default: true })
  active: boolean

  @Prop({ default: 0 })
  rate: number

  @Prop({ default: 'company' })
  role: string

  @Prop()
  categories: string[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }] })
  outstandings: FoodDocument[]

  @Prop({
    default: DateTime.now()
      .setZone('America/Bogota')
      .toFormat('dd/LL/y h:mm:ss a'),
  })
  date: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }] })
  foods: FoodDocument[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders: Order[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PromoCode' }] })
  promoCodes: PromoCodeDocument[]
}

export const CompanySchema = SchemaFactory.createForClass(Company)

CompanySchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject.__v
    delete returnObject._id
    delete returnObject.password
  },
})
