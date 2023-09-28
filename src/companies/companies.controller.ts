import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { NewCategoryDto } from './dto/add-category.dto'

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
  updateCompany(@Param('id') id: string, @Body() data: UpdateCompanyDto) {
    return this.companiesService.updateCompany(id, data)
  }

  @Post('category/:companyId')
  addCompanyCategory(
    @Param('companyId') companyId: string,
    @Body() { name }: NewCategoryDto,
  ) {
    return this.companiesService.addCompanyCategory(companyId, name)
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
