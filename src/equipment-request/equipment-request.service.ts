import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEquipmentRequestDto } from './dto/create-equipment-request.dto';
import EquipmentRequest from './equipment-request.model';

@Injectable()
export class EquipmentRequestService {

  async bulkCreate(createEquipmentRequestDtos: CreateEquipmentRequestDto[], medicalMaterialRequestId: number) {
    try {
      createEquipmentRequestDtos = createEquipmentRequestDtos.map(
        dto => ({ ...dto, medicalMaterialRequestId })
      );
      return await EquipmentRequest.bulkCreate(createEquipmentRequestDtos as EquipmentRequest[]);
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }
}
