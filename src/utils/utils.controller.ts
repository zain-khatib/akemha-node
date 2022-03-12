import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { multerOptions } from './file-upload.config';
import { UtilsService } from './utils.service';
import * as config from 'config';

@ApiBearerAuth()
@ApiTags('Utils')
@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) { }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async uploadFile(@UploadedFile() image: Express.Multer.File) {
    return { url: `https:/akemha.herokuapp.com/${image.filename}` };
  }

  @Get('max-size')
  async GetMaxSize() {
    return this.utilsService.GetMaxSize();
  }
}
