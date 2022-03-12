import { Module } from '@nestjs/common';
import { SterilizationService } from './sterilization.service';
import { DonationModule } from '../donation/donation.module';

@Module({
  imports: [DonationModule],
  providers: [SterilizationService],
  exports: [SterilizationService]
})
export class SterilizationModule { }
