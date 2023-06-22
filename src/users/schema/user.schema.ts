import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Cart } from 'src/carts/schema/cart.schema'
import { Order } from 'src/orders/schema/order.schema'
import { DateTime } from 'luxon'

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

  @Prop({
    default:
      'https://res.cloudinary.com/dnc21abpp/image/upload/v1687302507/avatars/user_ja0vle.png',
  })
  avatar: string

  @Prop({ default: true })
  active: boolean

  @Prop()
  address: string

  @Prop()
  tel: string

  @Prop({
    default: DateTime.now()
      .setZone('America/Bogota')
      .toFormat('dd/LL/y h:m:ss a'),
  })
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
