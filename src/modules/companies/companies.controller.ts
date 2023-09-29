import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { NewCategoryDto } from './dto/add-category.dto'
import { Roles } from '@decorators/roles/roles.decorator'
import { AuthGuard } from '@guards/auth/auth.guard'
import { RolesGuard } from '@guards/roles/roles.guard'

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

  @ApiBearerAuth()
  @Roles('company')
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  updateCompany(@Param('id') id: string, @Body() data: UpdateCompanyDto) {
    return this.companiesService.updateCompany(id, data)
  }

  @ApiBearerAuth()
  @Roles('company')
  @UseGuards(AuthGuard, RolesGuard)
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
