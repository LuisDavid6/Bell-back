import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'Haburguesas' })
  @IsString()
  @IsOptional()
  name: string

  @ApiPropertyOptional({ example: 'https://imagenes.com/hamburguesas.png' })
  @IsString()
  @IsOptional()
  image: string
}
