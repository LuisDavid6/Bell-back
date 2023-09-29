import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Food } from '../../foods/schema/food.schema'
import { Cart } from './cart.schema'

export type foodCartDocument = HydratedDocument<FoodCart>

@Schema()
export class FoodCart {
  @Prop({ default: 0 })
  total: number

  @Prop({ default: 1 })
  cant: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Food' })
  food: Food

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
  cart: Cart
}

export const FoodCartSchema = SchemaFactory.createForClass(FoodCart)

FoodCartSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject.__v
    delete returnObject._id
  },
})
