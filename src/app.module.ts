import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { FoodsModule } from './foods/foods.module'
import { MongooseModule } from '@nestjs/mongoose'
import { CompaniesModule } from './companies/companies.module'
import { UsersModule } from './users/users.module'
import { CategoriesModule } from './categories/categories.module'
import { CartsModule } from './carts/carts.module'
import { OrdersModule } from './orders/orders.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB),
    FoodsModule,
    CompaniesModule,
    UsersModule,
    CategoriesModule,
    CartsModule,
    OrdersModule,
    AuthModule,
  ],
})
export class AppModule {}
