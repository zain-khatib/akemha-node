import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { MedicalMaterialRequestService } from '../medical-material-request/medical-material-request.service';
import { SterilizationService } from '../sterilization/sterilization.service';
import User from '../user/user.model';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceType } from './enum/service-type.enum';
import Service from './service.model';

@Injectable()
export class ServiceService {
  constructor(
    private readonly sterilizationService: SterilizationService,
    private readonly medicalMaterialRequestService: MedicalMaterialRequestService
  ) { }
  async create(user: User, createServiceDto: CreateServiceDto) {
    try {
      const service = await Service.create({ ...createServiceDto, requesterId: user.id } as any);

      if (service.type === ServiceType.STERILIZATION && createServiceDto.sterilization)
        await this.sterilizationService.create(createServiceDto.sterilization, user, service.id);

      if (service.type === ServiceType.MEDICAL_MATERIAL_REQUEST && createServiceDto.medicalMaterialRequest)
        await this.medicalMaterialRequestService.create(createServiceDto.medicalMaterialRequest, service.id)
      return Service.findByPk(service.id);
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }
  async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      const [count, records] = await Service.update(updateServiceDto as Service, { where: { id }, returning: true });
      if (count === 1) return Service.findByPk(records[0].id);
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }


  findAll() {
    return Service.findAll();
  }

  async findOne(id: string) {
    const service = await Service.findOne({ where: { id } });
    if (!service)
      throw new NotFoundException('Service Not Found');
    return service;
  }

  async remove(id: string) {
    return Service.destroy({ where: { id } });
  }
}
