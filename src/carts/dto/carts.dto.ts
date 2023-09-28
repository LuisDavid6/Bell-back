import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class ProductToAddCartDto {
  @ApiProperty({ example: '6490a4aa60b8458618519b4a' })
  @IsString()
  @IsNotEmpty()
  userId: string

  @ApiProperty({ example: '64994a4a60b8458618519b8b' })
  @IsString()
  @IsNotEmpty()
  foodId: string

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  cant: number
}
