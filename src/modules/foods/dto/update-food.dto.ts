import { ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
} from 'class-validator'

export class UpdateFoodDto {
  @ApiPropertyOptional({ example: 'Perro Sencillo' })
  @IsString()
  @IsOptional()
  name: string

  @ApiPropertyOptional({ example: 'Pan, salchicha, papas, queso, salsas' })
  @IsString()
  @IsOptional()
  description: string

  @ApiPropertyOptional({ example: 8000 })
  @IsNumber()
  @IsOptional()
  price: number

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  offer: boolean

  @ApiPropertyOptional({ example: 6000, default: 0 })
  @IsNumber()
  @IsOptional()
  offerPrice: number

  @ApiPropertyOptional({ example: 'https://misimagenes.com/imagen' })
  @IsString()
  @IsOptional()
  img: string

  @ApiPropertyOptional({ example: ['Perros calientes'] })
  @IsArray()
  @IsOptional()
  category: string[]
}
