import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Food } from './food.schema'

export type companyDocument = HydratedDocument<Company>

@Schema()
export class Company {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  address: string

  @Prop()
  tel: string[]

  @Prop({ required: true })
  horary: string

  @Prop({ required: true })
  shipping: number

  @Prop({ default: true })
  active: boolean

  @Prop({ default: 0 })
  rate: number

  @Prop({ default: 'company' })
  role: string

  @Prop()
  date: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Food' })
  foods: Food[]
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
