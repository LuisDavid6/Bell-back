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

  @ApiProperty({ example: 'https://misimagenes.com/imagen' })
  @IsString()
  @IsOptional()
  image: string

  @ApiProperty({ example: 'Cra 5 Cll 3 #4' })
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiProperty({ example: '123456789' })
  @IsOptional()
  tel?: string

  @ApiProperty({ example: 'Lunes-Viernes 5pm-11pm' })
  @IsString()
  @IsOptional()
  horary: string

  @ApiProperty({ example: 2000 })
  @IsNumber()
  @IsOptional()
  shipping: number

  @ApiProperty({ example: ['Hamburguesas', 'Perros calientes', 'Salchipapas'] })
  @IsOptional()
  categories?: string[]
}

export class UpdateCompany {
  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  image: string

  @IsString()
  @IsOptional()
  address: string

  @IsString()
  @IsOptional()
  tel: string

  @IsString()
  @IsOptional()
  horary: string

  @IsNumber()
  @IsOptional()
  shipping: number
}

export class NewCategory {
  @IsString()
  @IsNotEmpty()
  name: string
}
