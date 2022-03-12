import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { where } from 'sequelize';
import { CreateMedicalEquipmentDto } from './dto/create-medical-equipment.dto';
import { UpdateMedicalEquipmentDto } from './dto/update-medical-equipment.dto';
import MedicalEquipment from './medical-equipment.model';

@Injectable()
export class MedicalEquipmentService {
  async create(createMedicalEquipmentDto: CreateMedicalEquipmentDto) {
    try {
      return await MedicalEquipment.create(createMedicalEquipmentDto as any);
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(withActiviation: boolean) {
    const where = withActiviation ? { isActive: true } : {};
    return MedicalEquipment.findAll({ where });
  }

  async findOne(id: number) {
    const medicalEquipment = await MedicalEquipment.findByPk(id);
    if (!medicalEquipment)
      throw new NotFoundException('Equipment Not Found');
    return medicalEquipment;
  }

  async update(id: number, updateMedicalEquipmentDto: UpdateMedicalEquipmentDto) {
    try {
      const [count, records] = await MedicalEquipment.update(updateMedicalEquipmentDto as any, { where: { id }, returning: true });
      if (count === 1) return MedicalEquipment.findByPk(records[0].id);
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return MedicalEquipment.destroy({ where: { id } });
  }
}
