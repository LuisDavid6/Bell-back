import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class NewOrderDto {
  @ApiProperty({ example: '6467a488195ec952e2f5f7ac' })
  @IsString()
  @IsNotEmpty()
  userId: string
}
