import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { FoodsModule } from './modules/foods/foods.module'
import { MongooseModule } from '@nestjs/mongoose'
import { CompaniesModule } from './modules/companies/companies.module'
import { UsersModule } from './modules/users/users.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { CartsModule } from './modules/carts/carts.module'
import { OrdersModule } from './modules/orders/orders.module'
import { AuthModule } from './modules/auth/auth.module'
import { PromoCodesModule } from './modules/promo-codes/promo-codes.module'

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
    PromoCodesModule,
  ],
})
export class AppModule {}
