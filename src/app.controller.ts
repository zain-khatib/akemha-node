import { Controller, Get } from '@nestjs/common';
import * as config from 'config';
import { AppService } from './app.service';
import { IsPublic } from './common/decorators/publicRoute.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @IsPublic()
  @Get('/heartbeat')
  getHello(): String {
    return `Akemha API is up and running on port ${config.get('port')}`
  }
}
