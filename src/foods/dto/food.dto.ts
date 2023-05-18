import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
} from 'class-validator'

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsOptional()
  @IsBoolean()
  offer?: boolean

  @IsNotEmpty()
  @IsString()
  img: string

  @IsNotEmpty()
  @IsArray()
  category: string[]

  @IsNotEmpty()
  @IsString()
  company: string
}
