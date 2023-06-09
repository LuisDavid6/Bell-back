import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { DateTime } from 'luxon'
import { Order } from 'src/orders/schema/order.schema'

export type companyDocument = HydratedDocument<Company>

@Schema()
export class Company {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop()
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
  outstandings: string[]

  @Prop({
    default: DateTime.now()
      .setZone('America/Bogota')
      .toFormat('dd/LL/y h:mm:ss a'),
  })
  date: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }] })
  foods: string[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orders' }] })
  orders: Order[]
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
