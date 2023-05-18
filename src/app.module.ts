import { Module } from '@nestjs/common'
import { FoodsModule } from './foods/foods.module'
import { MongooseModule } from '@nestjs/mongoose'
import { CompaniesModule } from './companies/companies.module'
import { config } from 'dotenv'
import { UsersModule } from './users/users.module'
import { CategoriesModule } from './categories/categories.module'
import { CartsModule } from './carts/carts.module'
import { OrdersModule } from './orders/orders.module'
import { SalesModule } from './sales/sales.module'

config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB),
    FoodsModule,
    CompaniesModule,
    UsersModule,
    CategoriesModule,
    CartsModule,
    OrdersModule,
    SalesModule,
  ],
})
export class AppModule {}
