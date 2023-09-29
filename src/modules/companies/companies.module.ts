import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Company, CompanySchema } from './schema/company.schema'
import { CompaniesController } from './companies.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
