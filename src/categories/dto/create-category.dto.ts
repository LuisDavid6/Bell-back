import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class NewCategoryDto {
  @ApiProperty({ example: 'Haburguesas' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: 'https://imagenes.com/hamburguesas.png' })
  @IsString()
  @IsNotEmpty()
  image: string
}
