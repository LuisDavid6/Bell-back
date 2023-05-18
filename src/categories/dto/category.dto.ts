import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class NewCategory {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  image: string
}

export class UpdateCategory {
  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  image: string
}
