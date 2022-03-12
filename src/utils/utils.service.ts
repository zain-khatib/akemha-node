import { Injectable } from '@nestjs/common';
import * as config from 'config';
@Injectable()
export class UtilsService {
  async GetMaxSize() {
    const size = config.get('fileUpload.maxSize');
    const units = ['B', 'KB', 'MB', 'GB'];
    let rem = size, unitIdx = 0;
    while ((rem / 1024) > 1) {
      unitIdx++;
      rem /= 1024;
    }
    return { maxSize: `${rem} ${units[unitIdx]}` };
  }
}
