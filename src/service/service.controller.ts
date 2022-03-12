import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { GetUser } from '../common/decorators/getUser.decorator';
import User from '../user/user.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Services')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Post()
  create(
    @GetUser() user: User,
    @Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(user, createServiceDto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
