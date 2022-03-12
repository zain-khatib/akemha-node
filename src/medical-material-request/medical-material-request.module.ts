import { Module } from '@nestjs/common';
import { EquipmentRequestModule } from '../equipment-request/equipment-request.module';
import { MedicalMaterialRequestService } from './medical-material-request.service';

@Module({
  imports: [EquipmentRequestModule],
  providers: [MedicalMaterialRequestService],
  exports: [MedicalMaterialRequestService]
})
export class MedicalMaterialRequestModule { }
