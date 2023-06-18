import { IsNotEmpty, IsString } from 'class-validator'

export class NewOrder {
  @IsString()
  @IsNotEmpty()
  userId: string
}
