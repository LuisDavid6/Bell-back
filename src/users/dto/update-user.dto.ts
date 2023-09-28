import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'user' })
  @IsOptional()
  @IsString()
  username: string

  @ApiPropertyOptional({ example: '123456789' })
  @IsOptional()
  @IsString()
  tel: string

  @ApiPropertyOptional({ example: 'Cra 5 Cll 4' })
  @IsOptional()
  @IsString()
  address: string

  @ApiPropertyOptional({ example: 'https://imagenes.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatar: string
}
