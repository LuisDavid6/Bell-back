import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

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

  @IsOptional()
  @IsString()
  address: string

  @IsString()
  @IsOptional()
  tel: string

  @IsOptional()
  @IsString()
  avatar: string
}

export class UpdateUser {
  @IsOptional()
  @IsString()
  username: string

  @IsOptional()
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  tel: string

  @IsOptional()
  @IsString()
  address: string

  @IsOptional()
  @IsString()
  avatar: string
}
