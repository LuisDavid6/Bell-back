import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreatePromoCodeDto {
  @ApiProperty({ example: 'halloween' })
  @IsString()
  @IsNotEmpty()
  code: string

  @ApiProperty({ example: 20 })
  @IsNumber()
  @IsNotEmpty()
  discount: number

  @ApiProperty({ example: '20/10/2023 10:00:00 AM' })
  @IsString()
  @IsNotEmpty()
  startDate: string

  @ApiProperty({ example: '31/10/2023 11:59:59 PM' })
  @IsString()
  @IsNotEmpty()
  expireDate: string
}
