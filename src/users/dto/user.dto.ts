import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateUser {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsOptional()
  @IsString()
  role: string

  @IsNotEmpty()
  @IsArray()
  address: string[]

  @IsString()
  @IsNotEmpty()
  tel: string
}
