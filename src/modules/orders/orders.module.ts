import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { CartsModule } from '../carts/carts.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Order, OrderSchema } from './schema/order.schema'
import { UsersModule } from '../users/users.module'
import { CompaniesModule } from '../companies/companies.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CartsModule,
    UsersModule,
    CompaniesModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
