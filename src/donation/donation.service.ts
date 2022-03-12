import { CreateDonationDto } from './dto/create-donation.dto';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import Donation from './donation.model';
import User from '../user/user.model';

@Injectable()
export class DonationService {
  async create(user: User, createDonationDto: CreateDonationDto) {
    try {
      const donation = await Donation.create({ ...createDonationDto, userId: user.id } as any);
      return Donation.scope('Donator').findByPk(donation.id);
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return Donation.scope('Donator').findAll();
  }

  async findOne(id: string) {
    const donation = await Donation.scope('Donator').findByPk(id);
    if (!donation)
      throw new NotFoundException('Donation Not Found');
    return donation;
  }

  // async update(id: string, updateDonationDto: UpdateDonationDto) {
  //   try {
  //     const [count, records] = await Donation.update(updateDonationDto, { where: { id }, returning: true });
  //     if (count === 1) return Donation.scope('Donator').findByPk(records[0].id);
  //   } catch (error) {
  //     if (error.message === 'Validation error')
  //       throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  remove(id: string) {
    return Donation.destroy({ where: { id } });
  }
}
