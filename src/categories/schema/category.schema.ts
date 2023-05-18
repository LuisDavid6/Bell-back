import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type categoryDocument = HydratedDocument<Category>

@Schema()
export class Category {
  @Prop({ required: true, unique: true })
  name: string

  @Prop({ required: true })
  image: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)

CategorySchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject.__v
    delete returnObject._id
  },
})
