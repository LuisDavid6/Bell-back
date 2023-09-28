import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'user' })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ example: 'user@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: '123' })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiPropertyOptional({ example: 'user', default: 'user' })
  @IsOptional()
  @IsString()
  role: string

  @ApiPropertyOptional({ example: 'Cra 2 #4' })
  @IsOptional()
  @IsString()
  address: string

  @ApiPropertyOptional({ example: '123456789' })
  @IsString()
  @IsOptional()
  tel: string

  @ApiPropertyOptional({ example: 'https://imagenes.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatar: string
}
