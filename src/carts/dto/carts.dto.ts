import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator'

export class ProductToAdd {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  foodId: string

  @IsNumber()
  @IsNotEmpty()
  cant: number

  @IsBoolean()
  isNewCompany: boolean
}
