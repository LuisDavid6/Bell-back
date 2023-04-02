import { Controller, Get, Post, Body } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './dto/company.dto'

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  getCompanies() {
    return this.companiesService.getCompanies()
  }

  @Post()
  createCompany(@Body() newCompany: CreateCompanyDto) {
    return this.companiesService.createCompany(newCompany)
  }
}
