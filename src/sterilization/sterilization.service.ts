import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Donation from '../donation/donation.model';
import { DonationService } from '../donation/donation.service';
import User from '../user/user.model';
import { CreateSterilizationDto } from './dto/create-sterilization.dto';
import Sterilization from './sterilization.model';

@Injectable()
export class SterilizationService {
  constructor(
    private readonly donationService: DonationService
  ) { }
  async create(createSterilizationDto: CreateSterilizationDto, user?: User, serviceId?: number) {
    try {
      const sterilization = await Sterilization.create({ ...createSterilizationDto, serviceId, requestDate: new Date() } as Sterilization);
      if (createSterilizationDto.donation) {
        this.donationService.create(user, { sterilizationId: sterilization.id, ...createSterilizationDto.donation });
      }
      return sterilization;
    } catch (error) {
      if (error.message === 'Validation error')
        throw new HttpException(error.errors[0].message, HttpStatus.BAD_REQUEST);
    }
  }

  // update(id: number, updateSterilizationDto: UpdateSterilizationDto) {
  //   return `This action updates a #${id} sterilization`;
  // }
}
