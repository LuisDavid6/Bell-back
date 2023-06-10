import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateCompanyDto {
  @ApiProperty({ example: 'Hamburguesas la 5ta' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: 'hamburguesasla5ta@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ example: '12345' })
  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsOptional()
  image: string

  @ApiProperty({ example: 'Cra 5 Cll 3 #4' })
  @IsString()
  @IsNotEmpty()
  address: string

  @IsOptional()
  tel?: string[]

  @ApiProperty({ example: 'Lunes-Viernes 5pm-11pm' })
  @IsString()
  @IsOptional()
  horary: string

  @ApiProperty({ example: 2000 })
  @IsNumber()
  @IsOptional()
  shipping: number

  @IsOptional()
  categories?: string[]
}
