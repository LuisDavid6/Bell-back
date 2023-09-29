import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class NewCategoryDto {
  @ApiProperty({ example: 'Hamburguesas' })
  @IsString()
  @IsNotEmpty()
  name: string
}
