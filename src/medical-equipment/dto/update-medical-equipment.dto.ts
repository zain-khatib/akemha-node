import { PartialType } from '@nestjs/swagger';
import { CreateMedicalEquipmentDto } from './create-medical-equipment.dto';

export class UpdateMedicalEquipmentDto extends PartialType(CreateMedicalEquipmentDto) {}
