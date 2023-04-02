import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Company, CompanySchema } from 'src/schemas/company.schema'
import { CompaniesController } from './companies.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
