import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EquipmentRequestService } from '../equipment-request/equipment-request.service';
import { CreateMedicalMaterialRequestDto } from './dto/create-medical-material-request.dto';
import MedicalMaterialRequest from './medical-material-request.model';

@Injectable()
export class MedicalMaterialRequestService {
  constructor(
    private readonly equipmentRequestService: EquipmentRequestService
  ) { }
  async create(createMedicalMaterialRequestDto: CreateMedicalMaterialRequestDto, serviceId: number) {
    try {
      const medicalMaterialRequest = await MedicalMaterialRequest.create({ ...createMedicalMaterialRequestDto, serviceId } as any);
      if (createMedicalMaterialRequestDto.equipmentRequests) {
        this.equipmentRequestService.bulkCreate(createMedicalMaterialRequestDto.equipmentRequests, medicalMaterialRequest.id);
      }
      return medicalMaterialRequest;
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  // update(id: number, updateMedicalMaterialRequestDto: UpdateMedicalMaterialRequestDto) {
  //   return `This action updates a #${id} medicalMaterialRequest`;
  // }
}
