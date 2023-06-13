import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './dto/company.dto'

@Controller('companies')
@ApiTags('Companies')
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

  @Get('info/:id')
  getCompanyInfo(@Param('id') companyId: string) {
    return this.companiesService.getCompanyInfo(companyId)
  }

  @Get(':id')
  getCompanyById(@Param('id') companyId: string) {
    return this.companiesService.getCompanyById(companyId)
  }
}
