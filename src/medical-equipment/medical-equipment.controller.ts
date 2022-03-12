import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalEquipmentService } from './medical-equipment.service';
import { CreateMedicalEquipmentDto } from './dto/create-medical-equipment.dto';
import { UpdateMedicalEquipmentDto } from './dto/update-medical-equipment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/role.decorator';
import { Role } from '../user/enum/role.enum';

@ApiBearerAuth()
@ApiTags('medical Equipments')
@Controller('medical-equipment')
export class MedicalEquipmentController {
  constructor(private readonly medicalEquipmentService: MedicalEquipmentService) { }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createMedicalEquipmentDto: CreateMedicalEquipmentDto) {
    return this.medicalEquipmentService.create(createMedicalEquipmentDto);
  }

  @Roles(Role.ADMIN)
  @Get('/all')
  findActive() {
    return this.medicalEquipmentService.findAll(false);
  }
  @Get('')
  findAll() {
    return this.medicalEquipmentService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalEquipmentService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalEquipmentDto: UpdateMedicalEquipmentDto) {
    return this.medicalEquipmentService.update(+id, updateMedicalEquipmentDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalEquipmentService.remove(+id);
  }
}
