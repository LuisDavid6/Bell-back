import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Cart } from 'src/carts/schema/cart.schema'
import { Order } from 'src/orders/schema/order.schema'
// import * as moment from 'moment'
// import 'moment-timezone'
// import moment from 'moment'
import * as moment from 'moment-timezone'
export type userDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ required: true })
  username: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ default: 'user' })
  role: string

  @Prop({ default: true })
  active: boolean

  @Prop({ required: true })
  address: string[]

  @Prop({ required: true })
  tel: string

  @Prop({ default: moment().utcOffset(-5).format('DD/MM/YYYY h:m:ss a') })
  date: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
  cart: Cart

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders: Order[]
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject.__v
    delete returnObject._id
    delete returnObject.password
    delete returnObject.active
    delete returnObject.date
  },
})
