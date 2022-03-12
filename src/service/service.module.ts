import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { SterilizationModule } from '../sterilization/sterilization.module';
import { MedicalMaterialRequestModule } from '../medical-material-request/medical-material-request.module';

@Module({
  imports: [SterilizationModule, MedicalMaterialRequestModule],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule { }
