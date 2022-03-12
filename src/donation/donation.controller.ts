import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GetUser } from '../common/decorators/getUser.decorator';
import { CreateDonationDto } from './dto/create-donation.dto';
import { Roles } from '../common/decorators/role.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DonationService } from './donation.service';
import { Role } from '../user/enum/role.enum';
import User from '../user/user.model';

@ApiBearerAuth()
@ApiTags('Donations')
@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) { }

  @Post()
  create(
    @GetUser() user: User,
    @Body() createDonationDto: CreateDonationDto
  ) {
    return this.donationService.create(user, createDonationDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.donationService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.donationService.findOne(id);
  }

  // @Patch(':id')
  // @Roles(Role.ADMIN)
  // update(@Param('id') id: string, @Body() updateDonationDto: UpdateDonationDto) {
  //   return this.donationService.update(id, updateDonationDto);
  // }

  // @Delete(':id')
  // @Roles(Role.ADMIN)
  // remove(@Param('id') id: string) {
  //   return this.donationService.remove(id);
  // }
}
