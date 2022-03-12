import { Module } from '@nestjs/common';
import { EquipmentRequestService } from './equipment-request.service';

@Module({
  providers: [EquipmentRequestService],
  exports: [EquipmentRequestService]
})
export class EquipmentRequestModule { }
