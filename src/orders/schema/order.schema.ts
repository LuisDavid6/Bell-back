import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Company } from 'src/companies/schema/company.schema'
import { Food } from 'src/foods/schema/food.schema'
import { User } from 'src/users/schema/user.schema'

export type orderDocument = HydratedDocument<Order>

export enum OrderStatus {
  Pending = 'Pendiente',
  InProccess = 'En proceso',
  Shipping = 'Enviado',
  Received = 'Recibido',
}

@Schema()
export class Order {
  @Prop({ required: true })
  ticket: string

  @Prop({ required: true })
  date: string

  @Prop({ required: true })
  total: number

  @Prop({ default: OrderStatus.Pending })
  status: OrderStatus

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }] })
  foods: Food[]

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
