import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateCompanyDto {
  @ApiProperty({ example: 'Hamburguesas la 5ta', required: false })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({ example: 'https://misimagenes.com/imagen', required: false })
  @IsString()
  @IsOptional()
  image: string

  @ApiProperty({ example: 'Cra 5 Cll 3 #4', required: false })
  @IsString()
  @IsOptional()
  address: string

  @ApiProperty({ example: '123456789', required: false })
  @IsString()
  @IsOptional()
  tel: string

  @ApiProperty({ example: 'Lunes-Viernes 5pm-11pm', required: false })
  @IsString()
  @IsOptional()
  horary: string

  @ApiProperty({ example: 2000, required: false })
  @IsNumber()
  @IsOptional()
  shipping: number
}
