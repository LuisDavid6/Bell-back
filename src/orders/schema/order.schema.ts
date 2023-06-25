import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { DateTime } from 'luxon'
import mongoose, { HydratedDocument } from 'mongoose'
import { FoodCart } from 'src/carts/schema/foodCart.schema'
import { Company } from 'src/companies/schema/company.schema'
import { User } from 'src/users/schema/user.schema'

export type orderDocument = HydratedDocument<Order>

export enum OrderStatus {
  Pending = 'pending',
  InProccess = 'inProccess',
  Shipping = 'shipping',
  Received = 'received',
}

@Schema()
export class Order {
  @Prop({ required: true })
  ticket: string

  @Prop({
    default: DateTime.now()
      .setZone('America/Bogota')
      .toFormat('dd/LL/y h:mm:ss a'),
  })
  date: string

  @Prop({ required: true })
  total: number

  @Prop({ default: OrderStatus.Pending })
  status: OrderStatus

  @Prop()
  foods: FoodCart[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User
}

export const OrderSchema = SchemaFactory.createForClass(Order)

OrderSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject.__v
    delete returnObject._id
  },
})
