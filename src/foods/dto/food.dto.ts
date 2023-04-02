export class CreateFoodDto {
  name: string
  description: string
  price: number
  offer?: boolean
  img: string
  category: string[]
  company: string
}
