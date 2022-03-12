import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwtAuth.guard';
import { NotificationModule } from './notification/notification.module';
import { BlogModule } from './blog/blog.module';
import { DonationModule } from './donation/donation.module';
import { TaskModule } from './task/task.module';
import { ServiceModule } from './service/service.module';
import { SterilizationModule } from './sterilization/sterilization.module';
import { MedicalMaterialRequestModule } from './medical-material-request/medical-material-request.module';
import { MedicalEquipmentModule } from './medical-equipment/medical-equipment.module';
import { EquipmentRequestModule } from './equipment-request/equipment-request.module';
import { UtilsModule } from './utils/utils.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FaqModule } from './faq/faq.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    NotificationModule,
    BlogModule,
    DonationModule,
    TaskModule,
    ServiceModule,
    SterilizationModule,
    MedicalMaterialRequestModule,
    MedicalEquipmentModule,
    EquipmentRequestModule,
    UtilsModule,
    FaqModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule { }
