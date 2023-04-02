import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Company } from './company.schema'

export type foodDocument = HydratedDocument<Food>

@Schema()
export class Food {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  price: number

  @Prop({ default: false })
  offer: boolean

  @Prop({ required: true })
  img: string

  @Prop({ default: true })
  available: boolean

  @Prop()
  category: string[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: Company
}

export const FoodSchema = SchemaFactory.createForClass(Food)

FoodSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject.__v
    delete returnObject._id
  },
})
