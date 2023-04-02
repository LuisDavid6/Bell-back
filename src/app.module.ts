import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FoodsModule } from './foods/foods.module'
import { MongooseModule } from '@nestjs/mongoose'
import { CompaniesModule } from './companies/companies.module'
import { config } from 'dotenv'

config()

@Module({
  imports: [
    FoodsModule,
    CompaniesModule,
    MongooseModule.forRoot(process.env.DB),
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
