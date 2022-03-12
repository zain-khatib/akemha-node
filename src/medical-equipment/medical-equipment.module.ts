import { Module } from '@nestjs/common';
import { MedicalEquipmentService } from './medical-equipment.service';
import { MedicalEquipmentController } from './medical-equipment.controller';

@Module({
  controllers: [MedicalEquipmentController],
  providers: [MedicalEquipmentService]
})
export class MedicalEquipmentModule {}
