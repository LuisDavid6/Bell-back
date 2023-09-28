import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
} from 'class-validator'

export class CreateFoodDto {
  @ApiProperty({ example: 'Perro Sencillo' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: 'Pan, salchicha, papas, queso, salsas' })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ example: 8000 })
  @IsNotEmpty()
  @IsNumber()
  price: number

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  offer?: boolean

  @ApiProperty({ example: 6000, default: 0, required: false })
  @IsOptional()
  @IsNumber()
  offerPrice?: number

  @ApiProperty({ example: 'https://misimagenes.com/imagen' })
  @IsNotEmpty()
  @IsString()
  img: string

  @ApiProperty({ example: ['Perros calientes'] })
  @IsNotEmpty()
  @IsArray()
  category: string[]

  @ApiProperty({ example: '6490a4ba60b9458411519b9b' })
  @IsNotEmpty()
  @IsString()
  company: string
}
