import { IsString, IsNotEmpty, IsBoolean } from 'class-validator'

export class ProductToAdd {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  foodId: string

  @IsBoolean()
  isNewCompany: boolean
}
