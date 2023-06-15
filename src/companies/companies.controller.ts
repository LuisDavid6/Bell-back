import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto, NewCategory, UpdateCompany } from './dto/company.dto'

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

  @Patch(':id')
  updateCompany(@Param('id') id: string, @Body() data: UpdateCompany) {
    return this.companiesService.updateCompany(id, data)
  }

  @Post('category/:id')
  addCompanyCategory(@Param('id') id: string, @Body() { name }: NewCategory) {
    return this.companiesService.addCompanyCategory(id, name)
  }

  @Get('info/:id')
  getCompanyInfo(@Param('id') companyId: string) {
    return this.companiesService.getCompanyInfo(companyId)
  }

  @Get('categories/:id')
  getCompanyCategories(@Param('id') companyId: string) {
    return this.companiesService.getCompanyCategories(companyId)
  }

  @Get(':id')
  getCompanyById(@Param('id') companyId: string) {
    return this.companiesService.getCompanyById(companyId)
  }
}
