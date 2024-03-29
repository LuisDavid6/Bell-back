import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { FoodCart } from './foodCart.schema'
import { Company } from '../../companies/schema/company.schema'
import { User } from '../../users/schema/user.schema'

export type cartDocument = HydratedDocument<Cart>

@Schema()
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ required: true, default: 0 })
  total: number

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodCart' }] })
  foods: FoodCart[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company', default: null })
  company: Company
}

export const CartSchema = SchemaFactory.createForClass(Cart)

CartSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject.__v
    delete returnObject._id
  },
})
